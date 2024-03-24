![Maintenance](https://img.shields.io/maintenance/yes/2024?color=blue)
![GitHub release (with filter)](https://img.shields.io/github/v/release/kverqus/lovelace-hassam-card?color=blue)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# HASSAM Card
Present waste collection information from the HASSAM integration sensor.

## Installation
### HACS
This repo is available for install through the HACS.

Search for `HASSAM Card` in the Frontend section.

### Manual installation
1. Download and copy `hassam-card.js` to `<config>/www/hassam-card.js`
2. [Register the hassam-card.js file that you just installed as a new resource](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources/)

## Configuration
```
type: custom:hassam-card
entity: sensor.ssam_schedule_<name>
```

## Screenshot
Shows three different cards configured, one for each garbage bin.

![bild](https://github.com/kverqus/lovelace-hassam-card/assets/59644775/e196c9dc-9fd1-48d6-bdf1-b9143215f896)
