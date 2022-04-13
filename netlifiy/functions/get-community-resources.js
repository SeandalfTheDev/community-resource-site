const Airtable = require('airtable')

const { AIRTABLE_API_KEY } = process.env;
const { AIRTABLE_BASE_ID } = process.env;

const base = new Airtable({
    apiKey: AIRTABLE_API_KEY
}).base(AIRTABLE_BASE_ID);

exports.handler = async function(event, context) {
    const {table } = JSON.parse(event.body);

    const records = await base(table).select({
        view: 'Grid view'
    }).all();

    const count = records.length;
    const pages = Math.ceil(count / limit);
    const offset = (page * limit) - limit;

    let pageOfRecords = records.slice(offset, limit * page);

    const response = {
        records: pageOfRecords,
        page: page,
        pages: pages,
        count: count
    };

    return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(response)
    };
}