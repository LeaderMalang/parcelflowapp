import json

import requests
import flask_login
from flask import request, redirect, url_for, Blueprint, render_template, flash, current_app, session
from sqlalchemy.exc import IntegrityError

from models import User, Order
from db import database
from utils import int_cast, get_countries

website = Blueprint("website", __name__)


@website.route("/")
def home():
    return render_template("index.html")


@website.route("/how-it-works")
def hiw():
    return render_template("how-it-works.html")


@website.route("/faqs")
def faqs():
    return render_template("faq.html")


@website.route("/order-quotes/<order_id>", methods=["POST", "GET"])
def order_quotes(order_id):
    if not int_cast(order_id):
        flash("Invalid Order ID.")
        return redirect(url_for("website.account"))

    order = Order.query.get(order_id)
    user = flask_login.current_user
    agent = User.query.get(order.agentID)
    key = current_app.config.get("STRIPE_PUBLISHABLE_KEY")

    if not order or not order.customer_email == user.email:
        flash("Order does not exist.")
        return redirect(url_for("website.account"))

    quote_params = {
        "origin": order.country_of_origin,
        "destination": user.country,
        "boxes": [
            {
                "length": order.length,
                "width": order.width,
                "height": order.height,
                "weight": order.weight
            }
        ],
        "goods_value": 100,
        "sender": {
            "name": "{} {}".format(agent.firstname, agent.lastname),
            "address1": "{} {}".format(agent.address1, agent.address2),
            "town": agent.town,
            "county": agent.county,
            "postcode": agent.postcode
        },
        "recipient": {
            "name": "{} {}".format(user.firstname, user.lastname),
            "address1": "{} {}".format(user.address1, user.address2),
            "town": user.town,
            "county": user.county,
            "postcode": user.postcode
        }
    }
    quotes = get_quotes(quote_params)
    session['quotes'] = quotes
    return render_template("payment.html", data={"quotes": quotes, "order": order, "key": key})


@website.route("/quick-quote", methods=["GET", "POST"])
def quick_quote():
    if request.method == "POST":
        print("We are reaching up to this point.")
        form = request.form
        request_params = (
            "origin", "destination", "sender_county", "receiver_county", "sender_town", "receiver_town", "height",
            "sender_postcode", "receiver_postcode", "sender_address1", "receiver_address1", "weight", "length", "width",
            "goods_value"
        )

        if all(arg in form and form.get(arg) for arg in request_params) and \
                all(int_cast(form.get(e)) for e in ['length', 'width', 'height', "weight"]):
            quote_params = {
                "origin": form.get('origin'),
                "destination": form.get('destination'),
                "boxes": [
                    {
                        "length": form.get('length'),
                        "width": form.get('width'),
                        "height": form.get('height'),
                        "weight": form.get('weight')
                    }
                ],
                "goods_value": form.get("goods_value"),
                "sender": {
                    "name": "Sender Name",
                    "address1": form.get("sender_address1"),
                    "town": form.get("sender_town"),
                    "county": form.get("sender_county"),
                    "postcode": form.get("sender_postcode")
                },
                "recipient": {
                    "name": "Receiver Name",
                    "address1": form.get("receiver_address1"),
                    "town": form.get("sender_town"),
                    "county": form.get("receiver_county"),
                    "postcode": form.get("receiver_postcode")
                }
            }
            quotes = get_quotes(quote_params)
            if quotes and not ("error" in quotes):
                return render_template("quick-quote.html", data={"quotes": quotes})
            else:
                flash("Failed to fetch prices")
        else:
            flash("Fill all the fields.")

    countries = get_countries()
    return render_template("quick-quote.html", data={"quotes": "", "countries": countries})

#fetch comments against Post
def blogComments(postId):
    if postId:
        commentsUrl='https://www.falconit-solutions.com/wp-json/wp/v2/comments?post='+postId
        commentsRes = requests.get(commentsUrl)
        comments = json.loads(commentsRes.content.decode())
        return comments
    else:
        return False
#fetch all Blog Posts
def blogPosts():
    postUrl = 'http://falconit-solutions.com/wp-json/wp/v2/posts'
    postsRes = requests.get(postUrl)
    posts = json.loads(postsRes.content.decode())
    return posts
#fetch all Blog Tags
def blogTags():
    tagsUrl = 'http://falconit-solutions.com/wp-json/wp/v2/tags'
    tagsRes = requests.get(tagsUrl)
    tags = json.loads(tagsRes.content.decode())
    return tags

#fetch all categories
def blogCatgories():
    categoryUrl='http://falconit-solutions.com/wp-json/wp/v2/categories'
    categoryRes=requests.get(categoryUrl)
    categories=json.loads(categoryRes.content.decode())
    return categories

#Post images
def postImage(url):
    imageRes=requests.get(url)
    image=json.loads(imageRes.content.decode())
    image=image.get('guid').get('rendered')
    return image

@website.route("/blog")
def blog():
    posts=blogPosts()
    tags=blogTags()
    categories=blogCatgories()
    for post in posts:
        imageJson=post.get('_links').get('wp:featuredmedia')
        attachmentUrl=imageJson[0].get('href')

        postimg=postImage(attachmentUrl)

        post.update({'postImage':postimg})

    print(posts)

    return render_template("blogs.html",data={'posts':posts,'tags':tags,'categories':categories})


@website.route("/contact-us")
def contact_us():
    return "contact_us"


@website.route("/services")
def services():
    return render_template("services.html")


@website.route("/account", methods=["GET", "POST"])
@flask_login.login_required
def account():
    if request.method == "GET" and request.args.get("delete_order"):
        order_id = request.args.get("delete_order")
        if int_cast(order_id):
            order = database.session.query(Order).get(int_cast(order_id))
            if order and order.order_status == "New":
                database.session.delete(order)
            try:
                database.session.commit()
            except Exception as e:
                print(e)
            flash("Order deleted successfully.")
        else:
            flash("Failed to delete order.")

    if flask_login.current_user.user_type == "Agent":
        orders = Order.query.filter((Order.agentID == None) | (Order.agentID == flask_login.current_user.userID)).all()
    else:
        orders = Order.query.filter_by(customer_email=flask_login.current_user.email).order_by(Order.orderID.desc()).all()
    for order in orders:
        if order.agentID:
            agent = User.query.get(order.agentID)
            order.address = "{} {}".format(agent.address1, agent.address2)

    # Updating customer details.
    if request.method == "POST":
        post_params = ("firstname", "lastname", "country", "mobile", "address1", "address2")
        if request.form.get("update_details"):
            # Update customer details.
            if all(param in request.form and request.form.get(param) for param in post_params):
                user_id = flask_login.current_user.userID
                if update_user_details({param: request.form.get(param) for param in post_params}, user_id):
                    flash("Details updated successfully.")
                else:
                    flash("Failed to update details.")
            else:
                flash("Please fill all the fields.")

        if request.form.get("update_password"):
            post_params = ["currentpassword", "newpassword"]
            if all(param in request.form and request.form.get(param) for param in post_params):
                user = flask_login.current_user
                if user.check_password(request.form.get("currentpassword")):
                    if update_customer_password(request.form.get("currentpassword"), request.form.get("newpassword")):
                        flash("Password updated successfully,")
                    else:
                        flash("Failed to update password.")
                else:
                    flash("Password is incorrect.")
            else:
                flash("Please fill all the fields")

        if request.form.get("newOrder"):
            post_params = ("country_of_origin", "package_description", "purchase_link")
            if all(param in request.form and request.form.get(param) for param in post_params):
                # All fields are present in form.
                order_params = {param: request.form.get(param) for param in post_params}
                order_params['customer_email'] = flask_login.current_user.email
                order_params['order_status'] = "New"

                database.session.add(Order(**order_params))
                try:
                    database.session.commit()
                except Exception as e:
                    print(e)
                    flash("Failed to create new order.")
                    return redirect(url_for("website.account"))

                flash("New Order created successfully.")
                return redirect(url_for("website.account"))

            else:
                flash("Please fill all the fields.")

        # Agent accepting the order.
        if request.method == "POST" and request.form.get("accept_order") and request.form.get("order_id"):
            agent_id = flask_login.current_user.userID
            order_id = request.form.get("order_id")
            if not int_cast(order_id):
                flash("Order could not be accepted.")
                return redirect(url_for("website.account"))

            order = Order.query.get(order_id)
            if order:
                order.agentID = agent_id
                try:
                    database.session.commit()
                except Exception as e:
                    print(e)
                    flash("Order could not be accepted.")
                else:
                    flash("Order accepted successfully.")
                    return redirect(url_for("website.account"))
            else:
                flash("Order could not be accepted. Not found.")

        # Changing status of order, by Agent.
        if request.method == "POST" and request.form.get("changeStatus"):

            post_params = (
                "order_id", "order_status", "weight", "received", "handling_cost", "consolidation_cost", "storage_cost",
                "length", "width", "height"
            )

            if all(param in request.form and request.form.get(param) for param in post_params):
                order_id = request.form.get(post_params[0])
                error = False
                if int_cast(order_id):
                    order = Order.query.get(order_id)
                    order.order_status = request.form[post_params[1]]
                    order.weight = request.form[post_params[2]]
                    order.received = request.form[post_params[3]]
                    order.handling_cost = request.form[post_params[4]]
                    order.consolidation_cost = request.form[post_params[5]]
                    order.storage_cost = request.form[post_params[6]]
                    order.length = request.form[post_params[7]]
                    order.width = request.form[post_params[8]]
                    order.height = request.form[post_params[9]]
                    try:
                        database.session.commit()
                    except Exception as e:
                        print(e)
                        flash("Failed to change status.")
                        error = True
                    if not error:
                        flash("Order status changed successfully.")
                        return redirect(url_for("website.account"))
                else:
                    flash("Failed to change status.")
            else:
                flash("Please select an option.")
    countries = get_countries()
    return render_template("my-account.html", data={"orders": orders, "countries": countries})


@website.route("/logout", methods=["GET"])
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return redirect(url_for("website.home"))


@website.route("/login", methods=["POST"])
def login():
    args = ("email", "password")
    if not all(arg in request.form for arg in args):
        flash("Please enter your email and password.")
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        flash("Invalid email or password.")
        return redirect(url_for("website.home"))

    # Logging in user.
    flask_login.login_user(user)

    return redirect(url_for("website.account"))


@website.route("/signup", methods=["GET", "POST"])
def signup():
    # FIXME >  Email duplicate issue, User type check.
    if flask_login.current_user.is_authenticated:
        # If user is logged in.
        return redirect(url_for("website.account"))
    if request.method == "POST":
        post_params = (
            "firstname", "lastname", "email", "address1", "address2", "country", "mobile", "user_type", "town",
            "county", "postcode"
        )

        if not all(arg in request.form and request.form.get(arg) for arg in post_params):
            # Checks if all the fields are filled.
            flash("Please fill all the fields.")
            return redirect(url_for("website.signup"))

        if not (request.form.get("password") and request.form.get("confirmpassword") and
                request.form.get("password") == request.form.get("confirmpassword")):
            # Check if passwords match.
            flash("Passwords do not match")
            return redirect(url_for("website.signup"))

        # Checking if user change the user type.
        if not (request.form.get('user_type') in ['Agent', "Customer"]):
            flash("Please fill all the fields.")
            return redirect(url_for("website.signup"))

        user_params = {param: request.form.get(param) for param in post_params}

        user = User(**user_params)
        user.set_password(request.form.get("password"))
        database.session.add(user)

        try:
            database.session.commit()
        except IntegrityError:
            flash("Email already exists.")
            return redirect(url_for("website.signup"))

        except Exception as e:
            print(e)
            # If database entry fails because of any other problem.
            flash("There is some problem, please try again.")
            return redirect(url_for("website.signup"))

        return redirect(url_for("website.home"))

    countries = get_countries()
    return render_template("signup.html", data={"countries": countries})


def update_user_details(customer_details, user_id):
    User.query.filter_by(userID=user_id).update(dict(**customer_details))
    try:
        database.session.commit()
    except Exception as e:
        print(e)
        return False

    return True


def update_customer_password(old_pass, new_pass):
    user = User.query.get(flask_login.current_user.userID)
    user.set_password(new_pass)
    try:
        database.session.commit()
    except Exception as e:
        # There is some error while saving the entry.
        print(e)
        return False
    # Entry modified successfully.
    return True


def get_quotes(quote_params):
    quote_url = "https://api.parcelmonkey.co.uk/GetQuote"
    # FIXME > Save credentials on config file.
    header = {
        "apiversion": current_app.config["API_VERSION"],
        "userid": current_app.config["USER_ID"],
        "token": current_app.config["PARCEFLOW_API_TOKEN"]
    }
    # Making post request.
    try:
        res = requests.post(quote_url, json=quote_params, headers=header, verify=False)
        quotes = json.loads(res.content.decode())
    except Exception as e:
        print(e)
        return []

    sorted(quotes, key=lambda x: x['total_price_gross'])
    return quotes

