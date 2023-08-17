# HASSAM Card
Present waste collection information from the HASSAM integration sensor.

## Installation
### Manual installation
1. Download and copy `hassam-card.js` to `<config>/www/hassam-card.js`
2. [Register the hassam-card.js file that you just installed as a new resource](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources/)

## Configuration
```
type: custom:hassam-card
entity: sensor.ssam_schedule_<name>
```