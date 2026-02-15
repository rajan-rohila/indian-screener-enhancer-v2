import { IndustryGroupKey } from "./industryGroups";
import { IndustryKey } from "./industries";
import { SubIndustryKey } from "./subIndustries";

type IndustryTree = {
  [G in IndustryGroupKey]: Partial<Record<IndustryKey, SubIndustryKey[]>>;
};

export const INDUSTRY_TREE: IndustryTree = {
  [IndustryGroupKey.FINANCIAL]: {
    [IndustryKey.BANKS]: [SubIndustryKey.PUBLIC_SECTOR_BANK, SubIndustryKey.PRIVATE_SECTOR_BANK, SubIndustryKey.OTHER_BANK],
    [IndustryKey.NBFC]: [SubIndustryKey.NBFC, SubIndustryKey.MICROFINANCE, SubIndustryKey.HOUSING_FINANCE],
    [IndustryKey.ASSET_MGMT]: [SubIndustryKey.AMC, SubIndustryKey.INVESTMENT_COMPANY],
    [IndustryKey.FINANCIAL_SERVICES]: [SubIndustryKey.FINANCIAL_INSTITUTION, SubIndustryKey.FINANCIAL_PRODUCTS_DISTRIBUTOR, SubIndustryKey.OTHER_FINANCIAL_SERVICES],
  },
  [IndustryGroupKey.INSURANCE]: {
    [IndustryKey.INSURANCE]: [SubIndustryKey.LIFE_INSURANCE, SubIndustryKey.GENERAL_INSURANCE],
    [IndustryKey.INSURANCE_DISTRIBUTORS]: [SubIndustryKey.INSURANCE_DISTRIBUTORS],
  },
  [IndustryGroupKey.METALS]: {
    [IndustryKey.IRON]: [SubIndustryKey.IRON_AND_STEEL, SubIndustryKey.IRON_AND_STEEL_PRODUCTS, SubIndustryKey.PIG_IRON, SubIndustryKey.SPONGE_IRON],
    [IndustryKey.ALUMINIUM]: [SubIndustryKey.ALUMINIUM, SubIndustryKey.ALUMINIUM_COPPER_ZINC_PRODUCTS],
    [IndustryKey.COPPER]: [SubIndustryKey.COPPER],
    [IndustryKey.ZINC]: [SubIndustryKey.ZINC],
    [IndustryKey.PRECIOUS_METALS]: [SubIndustryKey.PRECIOUS_METALS],
    [IndustryKey.OTHER_METALS]: [SubIndustryKey.DIVERSIFIED_METALS, SubIndustryKey.FERRO_SILICA_MANGANESE, SubIndustryKey.TRADING_METALS, SubIndustryKey.TRADING_MINERALS],
  },
  [IndustryGroupKey.ENERGY]: {
    [IndustryKey.POWER]: [SubIndustryKey.POWER_GENERATION, SubIndustryKey.POWER_DISTRIBUTION, SubIndustryKey.POWER_TRANSMISSION, SubIndustryKey.POWER_TRADING, SubIndustryKey.INTEGRATED_POWER_UTILITIES, SubIndustryKey.MULTI_UTILITIES],
    [IndustryKey.OIL_AND_GAS]: [SubIndustryKey.REFINERIES_AND_MARKETING, SubIndustryKey.OIL_EXPLORATION, SubIndustryKey.OIL_STORAGE, SubIndustryKey.OIL_EQUIPMENT, SubIndustryKey.OFFSHORE_SUPPORT, SubIndustryKey.GAS_TRANSMISSION, SubIndustryKey.LPG_CNG_PNG_LNG, SubIndustryKey.TRADING_GAS],
    [IndustryKey.COAL]: [SubIndustryKey.COAL],
  },
  [IndustryGroupKey.CHEMICALS]: {
    [IndustryKey.SPECIALTY_CHEMICALS]: [SubIndustryKey.SPECIALTY_CHEMICALS, SubIndustryKey.DYES_AND_PIGMENTS, SubIndustryKey.PRINTING_INKS, SubIndustryKey.CARBON_BLACK],
    [IndustryKey.AGRI_CHEMICALS]: [SubIndustryKey.PESTICIDES, SubIndustryKey.FERTILIZERS],
    [IndustryKey.COMMODITY_CHEMICALS]: [SubIndustryKey.COMMODITY_CHEMICALS, SubIndustryKey.PETROCHEMICALS, SubIndustryKey.INDUSTRIAL_GASES],
    [IndustryKey.INDUSTRIAL_CHEMICALS]: [SubIndustryKey.INDUSTRIAL_MINERALS, SubIndustryKey.ELECTRODES_REFRACTORIES, SubIndustryKey.LUBRICANTS],
    [IndustryKey.TRADING_CHEMICALS]: [SubIndustryKey.TRADING_CHEMICALS],
  },
  [IndustryGroupKey.INDUSTRIAL]: {
    [IndustryKey.ELECTRICAL]: [SubIndustryKey.HEAVY_ELECTRICAL, SubIndustryKey.OTHER_ELECTRICAL],
    [IndustryKey.MACHINERY]: [SubIndustryKey.COMPRESSORS_PUMPS],
    [IndustryKey.COMPONENTS]: [SubIndustryKey.ABRASIVES_BEARINGS, SubIndustryKey.CASTINGS_FORGINGS],
    [IndustryKey.INDUSTRIAL_PRODUCTS]: [SubIndustryKey.INDUSTRIAL_PRODUCTS, SubIndustryKey.OTHER_INDUSTRIAL_PRODUCTS, SubIndustryKey.GLASS_INDUSTRIAL],
  },
  [IndustryGroupKey.AUTO]: {
    [IndustryKey.OEM]: [SubIndustryKey.COMMERCIAL_VEHICLES, SubIndustryKey.TRACTORS, SubIndustryKey.PASSENGER_CARS, SubIndustryKey.TWO_THREE_WHEELERS, SubIndustryKey.CONSTRUCTION_VEHICLES],
    [IndustryKey.ANCILLARY]: [SubIndustryKey.TYRES_RUBBER, SubIndustryKey.AUTO_COMPONENTS, SubIndustryKey.TRADING_AUTO],
    [IndustryKey.DEALER]: [SubIndustryKey.AUTO_DEALER, SubIndustryKey.DEALERS_CV],
  },
  [IndustryGroupKey.INFRASTRUCTURE]: {
    [IndustryKey.CIVIL_CONSTRUCTION]: [SubIndustryKey.CIVIL_CONSTRUCTION],
    [IndustryKey.ROAD]: [SubIndustryKey.LOGISTICS, SubIndustryKey.ROAD_TRANSPORT, SubIndustryKey.TRANSPORT_SERVICES, SubIndustryKey.ROAD_ASSETS],
    [IndustryKey.RAIL]: [SubIndustryKey.RAILWAY_WAGONS],
    [IndustryKey.SEA]: [SubIndustryKey.PORT_SERVICES, SubIndustryKey.SHIP_BUILDING, SubIndustryKey.SHIPPING, SubIndustryKey.DREDGING],
    [IndustryKey.AIR]: [SubIndustryKey.AIRLINE, SubIndustryKey.AIRPORT_SERVICES],
  },
  [IndustryGroupKey.CONSTRUCTION]: {
    [IndustryKey.MATERIALS]: [SubIndustryKey.CEMENT, SubIndustryKey.PAINTS, SubIndustryKey.CERAMICS, SubIndustryKey.CABLES_ELECTRICALS, SubIndustryKey.SANITARY_WARE, SubIndustryKey.PLYWOOD_LAMINATES, SubIndustryKey.GLASS_CONSUMER, SubIndustryKey.OTHER_CONSTRUCTION_MATERIALS],
    [IndustryKey.REAL_ESTATE]: [SubIndustryKey.RESIDENTIAL_COMMERCIAL, SubIndustryKey.REAL_ESTATE_SERVICES, SubIndustryKey.REITS],
  },
  [IndustryGroupKey.CONSUMER]: {
    [IndustryKey.STAPLES]: [SubIndustryKey.CIGARETTES_TOBACCO, SubIndustryKey.DIVERSIFIED_FMCG, SubIndustryKey.HOUSEHOLD_PRODUCTS, SubIndustryKey.PACKAGED_FOODS, SubIndustryKey.PERSONAL_CARE],
    [IndustryKey.RETAIL]: [SubIndustryKey.DIVERSIFIED_RETAIL, SubIndustryKey.E_RETAIL, SubIndustryKey.FOOTWEAR, SubIndustryKey.GARMENTS_APPARELS, SubIndustryKey.INTERNET_CATALOGUE_RETAIL, SubIndustryKey.PHARMACY_RETAIL, SubIndustryKey.PLASTIC_PRODUCTS_CONSUMER, SubIndustryKey.SPECIALITY_RETAIL],
    [IndustryKey.DURABLES]: [SubIndustryKey.CONSUMER_ELECTRONICS, SubIndustryKey.HOUSEHOLD_APPLIANCES, SubIndustryKey.HOUSEWARE],
    [IndustryKey.DISCRETIONARY]: [SubIndustryKey.AMUSEMENT_PARKS, SubIndustryKey.GEMS_JEWELLERY, SubIndustryKey.HOTELS_RESORTS, SubIndustryKey.LEISURE_PRODUCTS, SubIndustryKey.RESTAURANTS, SubIndustryKey.TOUR_TRAVEL, SubIndustryKey.WELLNESS],
  },
  [IndustryGroupKey.FB]: {
    [IndustryKey.BEVERAGES]: [SubIndustryKey.BREWERIES_DISTILLERIES, SubIndustryKey.TEA_COFFEE, SubIndustryKey.OTHER_BEVERAGES],
    [IndustryKey.FB_STAPLES]: [SubIndustryKey.SUGAR, SubIndustryKey.EDIBLE_OIL, SubIndustryKey.DAIRY_PRODUCTS],
    [IndustryKey.PROTEIN]: [SubIndustryKey.MEAT_POULTRY, SubIndustryKey.SEAFOOD],
    [IndustryKey.OTHER_FB]: [SubIndustryKey.OTHER_FOOD_PRODUCTS, SubIndustryKey.ANIMAL_FEED],
  },
  [IndustryGroupKey.TEXTILE]: {
    [IndustryKey.TEXTILE_ALL]: [SubIndustryKey.OTHER_TEXTILE, SubIndustryKey.TRADING_TEXTILE],
  },
  [IndustryGroupKey.CRAFT_TYPE]: {
    [IndustryKey.CRAFT_OTHER]: [SubIndustryKey.FOREST_PRODUCTS, SubIndustryKey.FURNITURE, SubIndustryKey.GRANITES_MARBLES, SubIndustryKey.JUTE_PRODUCTS, SubIndustryKey.LEATHER_PRODUCTS, SubIndustryKey.PRINTING_PUBLICATION, SubIndustryKey.STATIONARY],
  },
  [IndustryGroupKey.MEDIA]: {
    [IndustryKey.ENTERTAINMENT]: [SubIndustryKey.FILM_PRODUCTION, SubIndustryKey.TV_BROADCASTING, SubIndustryKey.DIGITAL_ENTERTAINMENT, SubIndustryKey.MEDIA_ENTERTAINMENT],
    [IndustryKey.ADVERTISING]: [SubIndustryKey.ADVERTISING_AGENCIES],
    [IndustryKey.DIGITAL_MEDIA]: [SubIndustryKey.WEB_MEDIA, SubIndustryKey.ELECTRONIC_MEDIA],
    [IndustryKey.PRINT_MEDIA]: [SubIndustryKey.PRINT_MEDIA],
  },
  [IndustryGroupKey.HEALTHCARE]: {
    [IndustryKey.PHARMA]: [SubIndustryKey.PHARMACEUTICALS],
    [IndustryKey.HEALTHCARE_SERVICES]: [SubIndustryKey.HOSPITAL, SubIndustryKey.HEALTHCARE_SERVICE_PROVIDER],
    [IndustryKey.EQUIPMENT]: [SubIndustryKey.MEDICAL_EQUIPMENT, SubIndustryKey.HEALTHCARE_RESEARCH],
  },
  [IndustryGroupKey.TECH]: {
    [IndustryKey.IT_SERVICES]: [SubIndustryKey.SOFTWARE_CONSULTING, SubIndustryKey.IT_ENABLED_SERVICES, SubIndustryKey.SOFTWARE_PRODUCTS, SubIndustryKey.E_LEARNING, SubIndustryKey.FINTECH],
    [IndustryKey.TELECOM]: [SubIndustryKey.TELECOM_CELLULAR, SubIndustryKey.OTHER_TELECOM, SubIndustryKey.TELECOM_INFRASTRUCTURE, SubIndustryKey.TELECOM_EQUIPMENT],
    [IndustryKey.HARDWARE]: [SubIndustryKey.COMPUTERS_HARDWARE],
    [IndustryKey.BIOTECH]: [SubIndustryKey.BIOTECHNOLOGY],
  },
  [IndustryGroupKey.DEFENSE]: {
    [IndustryKey.DEFENSE_OTHER]: [SubIndustryKey.AEROSPACE_DEFENSE],
  },
};
