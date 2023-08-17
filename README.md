![maintained](https://img.shields.io/maintenance/yes/2023.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## Screenshot
![lovelace-hassam-card](https://github.com/kverqus/lovelace-hassam-card/assets/59644775/f9e8d74f-9374-4085-8675-1b90209b216b)