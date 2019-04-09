import json


def int_cast(num):
    try:
        return int(num)
    except ValueError:
        return False


def get_countries():
    with open("countries.json", "r") as cf:
        countries = json.load(cf)
        return countries

