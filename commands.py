from werkzeug.security import generate_password_hash

import click
from flask.cli import with_appcontext

from db import database
from models import User


dummy_accounts = [
    {
        "firstname": "Awais",
        "lastname": "Hanif",
        "password": generate_password_hash("asdzxc"),
        "email": "ihavemailaddress@gmail.com",
        "country": "PK",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Customer"
    },
    {
        "firstname": "Tayyab",
        "lastname": "Hanif",
        "password": generate_password_hash("asdzxc"),
        "email": "tayyab@gmail.com",
        "country": "US",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Agent"
    },
    {
        "firstname": "Uzair",
        "lastname": "Hanif",
        "password": generate_password_hash("asdzxc"),
        "email": "uzair@gmail.com",
        "country": "US",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Agent"
    },
    {
        "firstname": "Bilal",
        "lastname": "Shahid",
        "password": generate_password_hash("asdzxc"),
        "email": "bilal@gmail.com",
        "country": "GB",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Agent"
    },
    {
        "firstname": "John",
        "lastname": "Wolf",
        "password": generate_password_hash("asdzxc"),
        "email": "john@gmail.com",
        "country": "GB",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Agent"
    },
    {
        "firstname": "Helena",
        "lastname": "Mike",
        "password": generate_password_hash("asdzxc"),
        "email": "helena@gmail.com",
        "country": "GB",
        "mobile": "123456789",
        "address1": "Nowhere",
        "address2": "on Earth",
        "town": "New York",
        "county": "NY",
        "postcode": "10019",
        "user_type": "Agent"
    },
]


dummy_orders = []


def dummy_orders():
    pass


def generate_fake_accounts():
    for account in dummy_accounts:
        database.session.add(User(**account))

    database.session.commit()


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()

    # Generating fake accounts FIXME > Remove after development
    generate_fake_accounts()

    click.echo('Initialized the database.')


def init_db():
    database.drop_all()
    database.create_all()
    generate_admin()


@click.command('generate-admin')
@with_appcontext
def generate_admin_command():
    """Clear the existing data and create new tables."""
    generate_admin()
    click.echo('Created Admin account.')


def generate_admin():
    admin_user = {
        "firstname": "ParcelFlow",
        "lastname": "Admin",
        "password": generate_password_hash("password123"),
        "email": "admin@parcelflow.com",
        "country": "None",
        "mobile": "None",
        "user_type": "$Admin$"
    }
    database.session.add(User(**admin_user))
    database.session.commit()
