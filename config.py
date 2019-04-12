import os
class Config(object):
    # Env config.
    DEBUG = True

    # Session object config
    SECRET_KEY = b'T!ZwEjo~G")SrT(nvh&'

    # Database realted config (postgresql)
    DATABASE_NAME = "parcelflowapp"
    DATABASE_USER = "web"
    DATABASE_PASSWORD = "123"
    DATABASE_HOST = "localhost"

    # Payment API Config (Stripe)
    STRIPE_SECRET_KEY = "sk_test_L39RRwo4BfpVTApJNVJrLoQc"
    STRIPE_PUBLISHABLE_KEY = "pk_test_LJcpVJ0q93pnuix2fFpGqLbe"

    # ParcelFlow Uk API config.
    API_VERSION = "3.1"
    USER_ID =  "726857"
    PARCEFLOW_API_TOKEN =  "R8sfaQdG4y"

    # Sqlalchemy config
    #for local
    #SQLALCHEMY_DATABASE_URI = "postgresql://{}:{}@{}/{}".format(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME)
    #for heroku
    SQLALCHEMY_DATABASE_URI =os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False