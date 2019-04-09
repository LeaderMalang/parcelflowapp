import os

from flask import Flask

from db import database
from commands import init_db_command, generate_admin_command
from admin import admin
from website import website
from auth import login_manager
from payment import payment

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost/parcelflowapp"
# app.config["SECRET_KEY"] = b'T!ZwEjo~G")SrT(nvh&'
# app.config["STRIPE_SECRET_KEY"] = "sk_test_L39RRwo4BfpVTApJNVJrLoQc"
# app.config['STRIPE_PUBLISHABLE_KEY'] = "pk_test_LJcpVJ0q93pnuix2fFpGqLbe"

# Loading configuration for the app.
app.config.from_object('config.Config')

# Setting up database and auth.
app.app_context().push()
database.init_app(app)
login_manager.init_app(app)

app.register_blueprint(admin)
app.register_blueprint(website)
app.register_blueprint(payment)

app.cli.add_command(init_db_command)
app.cli.add_command(generate_admin_command)

if __name__ == '__main__':
    # FIXME > Move the configs to flask config file. It will be a better way to manage configurations.
    os.environ['FLASK_ENV'] = "development"
    app.run(debug=True)
