class Config(object):
    # Env config.
    DEBUG = True

    # Session object config
    SECRET_KEY = b'T!ZwEjo~G")SrT(nvh&'

    # Database realted config (postgresql)
    DATABASE_NAME = "d250s00n2gfc6k"
    DATABASE_USER = "vulsmuwxuugosh"
    DATABASE_PASSWORD = "90f222b3f34a067c148c6d6cdf6cc89f4fea6af2441fbba486d490de48e2cc7b"
    DATABASE_HOST = "ec2-50-19-127-115.compute-1.amazonaws.com:5432"

    # Payment API Config (Stripe)
    STRIPE_SECRET_KEY = "sk_test_L39RRwo4BfpVTApJNVJrLoQc"
    STRIPE_PUBLISHABLE_KEY = "pk_test_LJcpVJ0q93pnuix2fFpGqLbe"

    # ParcelFlow Uk API config.
    API_VERSION = "3.1"
    USER_ID =  "726857"
    PARCEFLOW_API_TOKEN =  "R8sfaQdG4y"

    # Sqlalchemy config
    SQLALCHEMY_DATABASE_URI = "postgresql://{}:{}@{}/{}".format(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = False