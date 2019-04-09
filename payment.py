import flask_login
import stripe
from flask import Blueprint, request, current_app, redirect, url_for, flash, session, render_template

from models import Order
from db import database
from utils import int_cast

payment = Blueprint("payment", __name__)


@payment.route("/charge", methods=["POST"])
def charge():
    order_id = request.form['orderID']

    order = Order.query.get(order_id)

    if not order:
        flash("Failed to make payment.")
        return redirect(url_for("website.account"))

    offer = request.form.get("offer")
    if not offer or not int_cast(offer):
        flash("Failed to make payment.")
        return redirect(url_for("website.account"))

    if "quotes" in session and session['quotes']:
        offer = session['quotes'][int_cast(offer)-1]
        del(session['quotes'])
    else:
        flash("Failed to make payment.")
        return redirect(url_for("website.account"))

    # Amount in cents

    amount = round(float(float(offer['total_price_net']) + float(order.handling_cost) + float(order.consolidation_cost) + float(order.storage_cost)) * 100)
    print(int_cast(offer['total_price_gross']),  float(order.handling_cost),  float(order.consolidation_cost),  float(order.storage_cost))

    stripe.api_key = current_app.config["STRIPE_SECRET_KEY"]

    try:
        customer = stripe.Customer.create(
            email=flask_login.current_user.email,
            source=request.form['stripeToken']
        )

        stripe.Charge.create(
            customer=customer.id,
            amount=amount,
            currency='usd',
            description='Order ID {}'.format(order_id)
        )
    except Exception as e:
        print(e)
        flash("Failed to make payment.")
        return redirect(url_for("website.account"))

    # Updating paid status.
    Order.query.filter_by(orderID=order_id).update({"is_paid": "True", "order_status": "Paid"})
    try:
        database.session.commit()
    except Exception as e:
        print(e)
        flash("Payment made, but could not be marked, please contact administrator.")
        return redirect(url_for("website.account"))
    # FIXME > Fix the if else statment in the html file of payment.
    return render_template("payment.html", data={"payment": "True", "amount": amount/100})
    # return redirect(url_for("website.account"))
