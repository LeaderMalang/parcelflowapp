from functools import wraps

import flask_login
from flask import current_app, abort

from db import database
from models import User


login_manager = flask_login.LoginManager()
login_manager.login_view = "website.home"


@login_manager.user_loader
def load_user(user_id):
    return database.session.query(User).get(int(user_id))


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not flask_login.current_user.is_authenticated:
            # user not authenticated.
            return current_app.login_manager.unauthorized()
        elif not flask_login.current_user.is_admin:
            # user not admin.
            return abort(404)

        # Returning the admin view.
        return func(*args, **kwargs)

    return decorated_view
