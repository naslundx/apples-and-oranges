import flask
import random
import argparse
# import pymongo
import os
import time

ALL_SETS = open('static/sets.csv').readlines()
app = flask.Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 604800
random.seed()


def get_size():
    return random.randint(2, 5)


def get_data(size, ignore=None):
    # TODO inefficient
    while True:
        time.sleep(0.25)
        index = random.randint(0, len(ALL_SETS) - 1)
        print(f"size={size}, found={index}, ignore={ignore}")
        print(index, len(ALL_SETS))
        if ignore and index == ignore:
            time.sleep(1.25)
            print("IGNORE!")
            continue
        data = ALL_SETS[index].split(',')
        if len(data) == size + 1:
            print("DONE!")
            return (index, data)


@app.route('/thanks')
def thanks():
    # TODO should this be here?
    rendered = flask.render_template('thanks.html')
    return rendered


@app.route('/about')
def about():
    rendered = flask.render_template('about.html')
    return rendered


@app.route('/results')
def results():
    rendered = flask.render_template('results.html')
    return rendered


@app.route('/')
def main():
    size = get_size()
    leftIndex, left = get_data(size)
    rightIndex, right = get_data(size, leftIndex)

    rendered = flask.render_template(
        'index.html',
        size=size,
        leftTitle=left[0],
        leftList=left[1:],
        rightTitle=right[0],
        rightList=right[1:]
    )
    return rendered


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--debug", action='store_true', help="Debug mode")
    args = parser.parse_args()
    app.run(debug=args.debug, use_reloader=args.debug)
