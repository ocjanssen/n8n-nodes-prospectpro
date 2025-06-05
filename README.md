# n8n-nodes-prospectpro

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

An n8n community node for integrating with the [ProspectPro API](https://docs.prospectpro.nl/). This node allows you to manage and retrieve prospect, contact, pageview, and event data directly within your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-prospectpro`
4. Agree to the risks and select **Install**

### Docker (Quick Start)

Run n8n with the ProspectPro node pre-installed:

```bash
./run.sh
```

Then access n8n at http://localhost:5679

To update the node after making changes:
```bash
npm run build && docker-compose restart
```

### Manual Installation

To get started:

```bash
npm install n8n-nodes-prospectpro
```

## Credentials

You need a ProspectPro API key to use this node:

1. Sign up at [ProspectPro](https://www.prospectpro.nl/)
2. Get your API key from your account dashboard
3. In n8n, create new credentials of type "ProspectPro API"
4. Enter your API key

## Supported Operations

### Prospects Resource

#### Get Prospect
Retrieve a single prospect from ProspectPro.

#### Get Many Prospects
Search and retrieve multiple prospects with filtering options.

#### Update Prospect
Update prospect information in ProspectPro.

### Pageviews Resource

#### Get Many Pageviews
Retrieve pageview data for prospects.

### Contacts Resource

#### Get Many Contacts
Retrieve contact information.

#### Create Contact
Create a new contact in ProspectPro.

#### Update Contact
Update existing contact information.

#### Delete Contact
Remove a contact from ProspectPro.

### Events Resource

#### Get Many Events
Retrieve event data.

#### Create Event
Create a new event in ProspectPro.

#### Delete Event
Remove an event from ProspectPro.

## ProspectPro Trigger Node

The package also includes a trigger node that can poll for new or updated prospects. This node supports:

- Filtering by qualification status
- Filtering by tags
- Filtering by audiences
- Filtering by owner

The trigger will automatically track the last time it ran to only retrieve new or updated prospects.

## Usage Examples

### Basic Prospect Search
Retrieve prospects from ProspectPro:
```json
{
  "resource": "prospects",
  "operation": "get_many",
  "additionalFields": {
    "rows": 10
  }
}
```

### Create Contact for a Prospect
Create a new contact associated with a prospect:
```json
{
  "resource": "contacts",
  "operation": "create",
  "prospectId": "123456",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

### Retrieve Recent Pageviews
Get recent pageviews data:
```json
{
  "resource": "pageviews",
  "operation": "get_many",
  "additionalFields": {
    "rows": 20,
    "sort_by": "timestamp",
    "sort_order": "desc"
  }
}
```

### Create a Custom Event
Log a custom event in ProspectPro:
```json
{
  "resource": "events",
  "operation": "create",
  "prospectId": "123456",
  "eventType": "meeting_scheduled",
  "eventData": {
    "time": "2023-05-15T14:30:00Z",
    "notes": "Initial consultation"
  }
}
```

## Trigger Node Example
Create an automated workflow that triggers when new qualified prospects are found:
```json
{
  "label": 1,
  "tags": ["high-value", "inbound"],
  "owner": "12345678"
}
```

## API Documentation

For detailed API documentation, visit [docs.prospectpro.nl](https://docs.prospectpro.nl/).

## Compatibility

- **n8n version**: 0.187.0 or later
- **Node.js version**: 20.15 or later

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ProspectPro API Documentation](https://docs.prospectpro.nl/)

## Development

### Prerequisites

- Node.js 20.15 or later
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone [your-repository-url]

# Install dependencies
npm install

# Build the node
npm run build

# Lint the code
npm run lint
```

### Testing

To test the node locally:

1. Build the node: `npm run build`
2. Link it to your global n8n installation: `npm link`
3. In your n8n directory: `npm link n8n-nodes-prospectpro`
4. Start n8n: `n8n start`

OR

```bash
./run.sh
```

## License

[MIT](LICENSE.md)

## Support

If you encounter any issues or have questions:

1. Check the [ProspectPro API documentation](https://docs.prospectpro.nl/)
2. Review the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
3. Open an issue in this repository

[ProspectPro](https://www.prospectpro.nl/) is a part of [Bedrijfsdata.nl](https://www.bedrijfsdata.nl/)