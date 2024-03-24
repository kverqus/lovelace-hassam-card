const lang = {
  "sv-SE": {
      header: "SSAM Hämtschema",
      pickup: "Hämtning",
      in: "om",
      today: "idag",
      days: "dagar",
      day: "dag",
      unit: "st"
  },
  "pt": {
      header: "Horario SSAM",
      pickup: "Apanhar",
      in: "em",
      today: "hoje",
      days: "dias",
      day: "dia",
      unit: "unidade"
  },
  "en-US": {
      header: "SSAM Schedule",
      pickup: "Pickup",
      in: "in",
      today: "today",
      days: "days",
      day: "day",
      unit: ""
  },
  "en-GB": {
      header: "SSAM Schedule",
      pickup: "Pickup",
      in: "in",
      today: "today",
      days: "days",
      day: "day",
      unit: ""
  },
};

class HASSAMCard extends HTMLElement {
  set hass(hass) {
      const entityId = this.config.entity;
      const entity = hass.states[entityId];
      var html = `<style>
      ha-card {
        background-color: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px rgba(0, 0, 0, 0.14), 0 1px 5px rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2));
      }

      .entry {
        display: flex;
      }

      .icon-container {
        margin-right: 14px;
      }

      .trash-icon {
        color: var(--primary-color)
      }

      ha-card {
          --mdc-icon-size: 3.5em;
      }

      .head {
          font-size: 2em;
      }

      .sub-info {
          display: block;
      }

      .info-container {
          margin-top: 8px;
      }
    </style>
    `;
      let culture = lang[navigator.language] ? navigator.language : "sv-SE";

      if (!this.content) {
          this.innerHTML = `
              <ha-card>
                  <div class="card-content"></div>
              </ha-card>
              `;
          this.content = this.querySelector("div");
      }
      if (entity) {
          let pickup = `${lang[culture]["pickup"]} ${entity.attributes.days_from_today != 0 ? `${lang[culture]["in"]} ${entity.attributes.days_from_today} ${entity.attributes.days_from_today == 1 ? lang[culture]["day"] : lang[culture]["days"]}` : lang[culture]["today"]} (${entity.attributes.next_waste_pickup})`;

          if (!entity.attributes.days_from_today) pickup = `${lang[culture]["pickup"]} ${entity.attributes.next_waste_pickup}`;

          html += `<div class="entry">
              <div class="icon-container">
                  <ha-icon class="trash-icon" icon="mdi:trash-can-outline"></ha-icon>
              </div>
              <div class="info-container">
                  <span class="head">
                      ${entity.attributes.waste_type}
                  </span>
                  <span class="sub-info">
                      ${pickup}
                  </span>
              </div>
          </div>
          `;
      }

      this.content.innerHTML = html;
  }

  setConfig(config) {
      if (!config.entity) {
          throw new Error("You need to define an entity");
      }
      this.config = config;
  }

  getCardSize() {
      return 3;
  }
}

customElements.define("hassam-card", HASSAMCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "hassam-card",
  name: "HASSAM Card",
  preview: true,
  description: "A card to display SSAM's pickup schedule",
});