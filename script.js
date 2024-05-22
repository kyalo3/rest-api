const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const recipients = [
  {title: 'brian', id: 1},
  {title: 'john', id: 2},
  {title: 'derro', id: 3},
  {title: 'collo', id: 4},
]

app.get('/', (req, res) => {
  res.send('Welcome to the Recipients API');
});

app.get('/api/recipients', (req, res) => {
  res.send(recipients);
});

app.get('/api/recipients/:id', (req, res) => {
  const recipient = recipients.find((c) => c.id === parseInt(req.params.id));
  if (!recipient)
    return res.status(404).send('The recipient with the given ID was not found');
  res.send(recipient);
});

function validateRecipient(recipient) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  return schema.validate(recipient);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
