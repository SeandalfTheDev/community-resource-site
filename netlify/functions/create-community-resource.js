const Airtable = require('airtable')

const { AIRTABLE_API_KEY } = process.env;
const { AIRTABLE_BASE_ID } = process.env;

const base = new Airtable({
    apiKey: AIRTABLE_API_KEY
}).base(AIRTABLE_BASE_ID);

exports.handler = async function(event, context) {
    const {table, title, url } = JSON.parse(event.body);
    const response = await base(table).create({
        "Title": `${title}`,
        "Url": `${url}`
    });

    if(!response) {
        return {
            statusCode: 400,
            body: 'Something went wrong'
        }
    }

    return {
        statusCode: 201,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(response)
    };
}