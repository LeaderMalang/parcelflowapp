from flask import request, Blueprint, render_template, url_for, flash, redirect

from models import Order, User
from db import database as db
from auth import admin_required
from utils import int_cast
from website import update_user_details


admin = Blueprint('admin', __name__, url_prefix="/admin")


@admin.route("/")
@admin_required
def dashboard():
    return render_template("admin/dashboard.html")


@admin.route("/orders", methods=["GET", "POST"])
@admin_required
def orders():
    post_params = (
        "agentID", "order_status", "customer_email", "country_of_origin", "is_paid","received", "purchase_link",
        "handling_cost" ,"consolidation_cost" ,"storage_cost" ,"weight" ,"length" ,"width" ,"height" ,"package_description"
    )
    if request.method == "GET" and request.args.get("delete_order"):
        order_id = request.args.get("delete_order")
        if int_cast(order_id):
            order = db.session.query(Order).get(int_cast(order_id))
            if order:
                db.session.delete(order)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
            flash("Order deleted successfully.")
        else:
            flash("Failed to delete order.")

    orders = Order.query.order_by(Order.orderID).all()
    q = ""
    if request.method == "POST" and request.form.get("search_orders"):
        order_id = request.form.get("q")
        q = order_id
        if int_cast(order_id):
            order = db.session.query(Order).get(int_cast(order_id))
            if order:
                orders = [order]
            else:
                orders = []
                flash("No Orders found.")
        else:
            flash("No Orders found.")
            orders = []

    if request.method == "POST" and "updateOrder" in request.form:

        if all(param in request.form and request.form.get(param) for param in post_params):
            params = {param: request.form.get(param) for param in post_params}
            order_id = request.form.get('orderID')
            if update_oder_details(params, order_id):
                flash("Order updated successfully.")
                return redirect(url_for("admin.orders"))
            else:
                flash("Failed to update order.")
        else:
            flash("Please fill all fields.")

    return render_template("admin/orders.html", data={"orders": orders, "q": q})


@admin.route("/users", methods=['GET', 'POST'])
@admin_required
def users():
    if request.method == "GET" and request.args.get("delete_user"):
        user_id = request.args.get("delete_user")
        error = False
        try:
            user_id = int(user_id)
        except ValueError:
            error = True

        if not error:
            user = db.session.query(User).get(user_id)
            if user:
                db.session.delete(user)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
            flash("User deleted successfully.")

    if request.method == "POST" and "updateUser" in request.form:

        post_params = (
            "firstname", "lastname", "address1", "address2", "email", "country", "county",
            "town", "mobile", "postcode", "user_type"
        )
        if all(param in request.form and request.form.get(param) for param in post_params) and request.form.get("userID"):
            user_id = request.form.get("userID")
            if update_user_details({param: request.form.get(param) for param in post_params}, user_id):
                flash("User details updated successfully.")
                return redirect(url_for("admin.users"))
            else:
                flash("Failed to update user details.")
        else:
            flash("Please fill all fields.")

    return render_template("admin/users.html", data={"users": User.query.order_by(User.userID).all()})


def update_oder_details(order_details, order_id):
    Order.query.filter_by(orderID=order_id).update(dict(**order_details))
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return False

    return True
