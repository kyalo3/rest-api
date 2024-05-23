from flask import Flask, jsonify

app = Flask(__name__)

recipients = [
    {"title": "brian", "id": 1},
    {"title": "john", "id": 2},
    {"title": "derro", "id": 3},
    {"title": "collo", "id": 4},
]


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to the Recipients API'})


@app.route('/api/recipients', methods=['GET'])
def get_recipients():
    return jsonify(recipients)


@app.route('/api/recipients/<int:recipient_id>', methods=['GET'])
def get_recipient(recipient_id):
    recipient = next((r for r in recipients if r['id'] == recipient_id), None)
    if recipient is None:
        return jsonify({
            'error': 'The recipient with the given ID was not found'}), 404
    return jsonify(recipient)


if __name__ == '__main__':
    app.run(port=8080, debug=True)
