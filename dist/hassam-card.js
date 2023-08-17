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
  "en-US": {
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
    const state = hass.states[entityId];
    var html = `<style>
      ha-card {
        background-color: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px rgba(0, 0, 0, 0.14), 0 1px 5px rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2));
      }
  
      .entry {
        border-radius: 8px;
        padding: 5px;
        border: 1px solid var(--secondary-text-color);
        margin-bottom: 10px;
        display: flex;
      }
  
      .icon-container {
        display: flex;
        align-items: center;
        margin-right: 14px;
      }
  
      .trash-icon {
        color: var(--primary-color)
      }
  
      .info-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
  
      .sub-info {
        font-size: smaller;
      }
    </style>
    `;
    let culture = navigator.language ? navigator.language : "sv-SE";

    if (!this.content) {
      this.innerHTML = `
              <ha-card header="${hass.states[entityId]?.attributes?.friendly_name ? hass.states[entityId].attributes.friendly_name : lang[culture]['header']}">
                  <div class="card-content"></div>
              </ha-card>
              `;
      this.content = this.querySelector("div");
    }

    if (state) {
      html += '<div class="entries">';
      const attributes = hass.states[entityId].attributes;
      const entries = attributes.entries;

      for (let i = 0; i < Object.keys(entries).length; i++) {
        const entry = entries[i];
        html += `
            <div class="entry">
              <div class="icon-container">
                <ha-icon class="trash-icon" icon="mdi:trash-can-outline"></ha-icon>
              </div>
              <div class="info-container">
                <span class="info">
                  ${lang[culture]["pickup"]} ${entry.days_from_today != 0 ? `${lang[culture]["in"]} ${entry.days_from_today} ${entry.days_from_today == 1 ? lang[culture]["day"] : lang[culture]["days"]}` : lang[culture]["today"]} (${entry.next_waste_pickup})
                </span>
                <span class="info sub-info">
                  ${entry.waste_type} (${entry.number_of_bins} ${lang[culture]["unit"]} ${entry.bin_type} ${entry.bin_size}${entry.bin_unit})
                </span>
              </div>
            </div>
          `;
      }

      html += `
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
