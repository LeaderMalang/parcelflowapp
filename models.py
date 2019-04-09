import datetime

from werkzeug.security import generate_password_hash, check_password_hash
from db import database as db


class User(db.Model):
    is_authenticated = True
    is_active = True
    is_anonymous = False
    userID = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    address1 = db.Column(db.String(50))
    address2 = db.Column(db.String(50))
    county = db.Column(db.String(20))
    town = db.Column(db.String(20))
    postcode = db.Column(db.String(20))
    country = db.Column(db.String(20))
    mobile = db.Column(db.String(30))
    user_type = db.Column(db.String(10), nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)
    created_on = db.Column(db.DateTime, server_default=str(datetime.datetime.now()))

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_id(self):
        return self.userID

    @property
    def is_admin(self):
        return self.user_type == "$Admin$"

    def __str__(self):
        return "({} {})".format(self.firstname + " " + self.lastname, self.userID)


class Order(db.Model):
    orderID = db.Column(db.Integer, primary_key=True)
    agentID = db.Column(db.Integer, db.ForeignKey('user.userID'))
    customer_email = db.Column(db.String(45), nullable=False)
    country_of_origin = db.Column(db.String(20), nullable=False)
    purchase_link = db.Column(db.String(45), nullable=False)
    order_status = db.Column(db.String(20))
    handling_cost = db.Column(db.Float)
    consolidation_cost = db.Column(db.Float)
    storage_cost = db.Column(db.Float)
    received = db.Column(db.String(20))
    weight = db.Column(db.Integer)
    length = db.Column(db.Integer)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    package_description = db.Column(db.Text)
    is_paid = db.Column(db.String(7), server_default="False")
    created_on = db.Column(db.DateTime, server_default=str(datetime.datetime.now()))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
