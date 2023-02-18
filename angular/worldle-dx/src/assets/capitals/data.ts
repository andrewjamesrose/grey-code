import { Country } from "src/app/models/game-logic";

// this version:
//      Fixes problem with capital lat/longs being incorrect
//      inclues the populated hasBoundary3D


// Duplicated Flags are present. Only the parent will be included in the game.


export const NEW_COUNTRY_LIST: Country[] = [
    {
        "name": "Afghanistan",
        "capital": "Kabul",
        "capitalLatLong": {
            "latitude": 34.575503,
            "longitude": 69.240073
        },
        "centroidLatLong": {
            "latitude": 33.93911,
            "longitude": 67.709953
        },
        "code": "AF",
        "codeThree": "AFG",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Aaland Islands",
        "capital": "Mariehamn",
        "capitalLatLong": {
            "latitude": 60.1,
            "longitude": 19.933333
        },
        "centroidLatLong": {
            "latitude": 60.1,
            "longitude": 19.933333
        },
        "code": "AX",
        "codeThree": "ALA",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Albania",
        "capital": "Tirana",
        "capitalLatLong": {
            "latitude": 41.327546,
            "longitude": 19.818698
        },
        "centroidLatLong": {
            "latitude": 41.153332,
            "longitude": 20.168331
        },
        "code": "AL",
        "codeThree": "ALB",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Algeria",
        "capital": "Algiers",
        "capitalLatLong": {
            "latitude": 36.752887,
            "longitude": 3.042048
        },
        "centroidLatLong": {
            "latitude": 28.033886,
            "longitude": 1.659626
        },
        "code": "DZ",
        "codeThree": "DZA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "American Samoa",
        "capital": "Pago Pago",
        "capitalLatLong": {
            "latitude": -14.275632,
            "longitude": -170.702036
        },
        "centroidLatLong": {
            "latitude": -14.270972,
            "longitude": -170.132217
        },
        "code": "AS",
        "codeThree": "ASM",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Andorra",
        "capital": "Andorra la Vella",
        "capitalLatLong": {
            "latitude": 42.506317,
            "longitude": 1.521835
        },
        "centroidLatLong": {
            "latitude": 42.546245,
            "longitude": 1.601554
        },
        "code": "AD",
        "codeThree": "AND",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Angola",
        "capital": "Luanda",
        "capitalLatLong": {
            "latitude": -8.839988,
            "longitude": 13.289437
        },
        "centroidLatLong": {
            "latitude": -11.202692,
            "longitude": 17.873887
        },
        "code": "AO",
        "codeThree": "AGO",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Anguilla",
        "capital": "The Valley",
        "capitalLatLong": {
            "latitude": 18.214813,
            "longitude": -63.057441
        },
        "centroidLatLong": {
            "latitude": 18.220554,
            "longitude": -63.068615
        },
        "code": "AI",
        "codeThree": "AIA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Antarctica",
        "capital": "South Pole",
        "capitalLatLong": {
            "latitude": -90,
            "longitude": 0
        },
        "centroidLatLong": {
            "latitude": -75.250973,
            "longitude": -0.071389
        },
        "code": "AQ",
        "codeThree": "ATA",
        "continent": "Antarctica",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Antigua and Barbuda",
        "capital": "St. John's",
        "capitalLatLong": {
            "latitude": 17.12741,
            "longitude": -61.846772
        },
        "centroidLatLong": {
            "latitude": 17.060816,
            "longitude": -61.796428
        },
        "code": "AG",
        "codeThree": "ATG",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Argentina",
        "capital": "Buenos Aires",
        "capitalLatLong": {
            "latitude": -34.603684,
            "longitude": -58.381559
        },
        "centroidLatLong": {
            "latitude": -38.416097,
            "longitude": -63.616672
        },
        "code": "AR",
        "codeThree": "ARG",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Armenia",
        "capital": "Yerevan",
        "capitalLatLong": {
            "latitude": 40.179186,
            "longitude": 44.499103
        },
        "centroidLatLong": {
            "latitude": 40.069099,
            "longitude": 45.038189
        },
        "code": "AM",
        "codeThree": "ARM",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Aruba",
        "capital": "Oranjestad",
        "capitalLatLong": {
            "latitude": 12.509204,
            "longitude": -70.008631
        },
        "centroidLatLong": {
            "latitude": 12.52111,
            "longitude": -69.968338
        },
        "code": "AW",
        "codeThree": "ABW",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Australia",
        "capital": "Canberra",
        "capitalLatLong": {
            "latitude": -35.282,
            "longitude": 149.128684
        },
        "centroidLatLong": {
            "latitude": -25.274398,
            "longitude": 133.775136
        },
        "code": "AU",
        "codeThree": "AUS",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Austria",
        "capital": "Vienna",
        "capitalLatLong": {
            "latitude": 48.208174,
            "longitude": 16.373819
        },
        "centroidLatLong": {
            "latitude": 47.516231,
            "longitude": 14.550072
        },
        "code": "AT",
        "codeThree": "AUT",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Azerbaijan",
        "capital": "Baku",
        "capitalLatLong": {
            "latitude": 40.409262,
            "longitude": 49.867092
        },
        "centroidLatLong": {
            "latitude": 40.143105,
            "longitude": 47.576927
        },
        "code": "AZ",
        "codeThree": "AZE",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bahamas",
        "capital": "Nassau",
        "capitalLatLong": {
            "latitude": 25.047984,
            "longitude": -77.355413
        },
        "centroidLatLong": {
            "latitude": 25.03428,
            "longitude": -77.39628
        },
        "code": "BS",
        "codeThree": "BHS",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bahrain",
        "capital": "Manama",
        "capitalLatLong": {
            "latitude": 26.228516,
            "longitude": 50.58605
        },
        "centroidLatLong": {
            "latitude": 25.930414,
            "longitude": 50.637772
        },
        "code": "BH",
        "codeThree": "BHR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Bangladesh",
        "capital": "Dhaka",
        "capitalLatLong": {
            "latitude": 23.810332,
            "longitude": 90.412518
        },
        "centroidLatLong": {
            "latitude": 23.684994,
            "longitude": 90.356331
        },
        "code": "BD",
        "codeThree": "BGD",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Barbados",
        "capital": "Bridgetown",
        "capitalLatLong": {
            "latitude": 13.113222,
            "longitude": -59.598809
        },
        "centroidLatLong": {
            "latitude": 13.193887,
            "longitude": -59.543198
        },
        "code": "BB",
        "codeThree": "BRB",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Belarus",
        "capital": "Minsk",
        "capitalLatLong": {
            "latitude": 53.90454,
            "longitude": 27.561524
        },
        "centroidLatLong": {
            "latitude": 53.709807,
            "longitude": 27.953389
        },
        "code": "BY",
        "codeThree": "BLR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Belgium",
        "capital": "Brussels",
        "capitalLatLong": {
            "latitude": 50.85034,
            "longitude": 4.35171
        },
        "centroidLatLong": {
            "latitude": 50.503887,
            "longitude": 4.469936
        },
        "code": "BE",
        "codeThree": "BEL",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Belize",
        "capital": "Belmopan",
        "capitalLatLong": {
            "latitude": 17.251011,
            "longitude": -88.75902
        },
        "centroidLatLong": {
            "latitude": 17.189877,
            "longitude": -88.49765
        },
        "code": "BZ",
        "codeThree": "BLZ",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Benin",
        "capital": "Porto-Novo",
        "capitalLatLong": {
            "latitude": 6.496857,
            "longitude": 2.628852
        },
        "centroidLatLong": {
            "latitude": 9.30769,
            "longitude": 2.315834
        },
        "code": "BJ",
        "codeThree": "BEN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bermuda",
        "capital": "Hamilton",
        "capitalLatLong": {
            "latitude": 32.294816,
            "longitude": -64.781375
        },
        "centroidLatLong": {
            "latitude": 32.321384,
            "longitude": -64.75737
        },
        "code": "BM",
        "codeThree": "BMU",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Bhutan",
        "capital": "Thimphu",
        "capitalLatLong": {
            "latitude": 27.472792,
            "longitude": 89.639286
        },
        "centroidLatLong": {
            "latitude": 27.514162,
            "longitude": 90.433601
        },
        "code": "BT",
        "codeThree": "BTN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bolivia",
        "capital": "La Paz",
        "capitalLatLong": {
            "latitude": -16.489689,
            "longitude": -68.119294
        },
        "centroidLatLong": {
            "latitude": -16.290154,
            "longitude": -63.588653
        },
        "code": "BO",
        "codeThree": "BOL",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bosnia and Herzegovina",
        "capital": "Sarajevo",
        "capitalLatLong": {
            "latitude": 43.856259,
            "longitude": 18.413076
        },
        "centroidLatLong": {
            "latitude": 43.915886,
            "longitude": 17.679076
        },
        "code": "BA",
        "codeThree": "BIH",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Botswana",
        "capital": "Gaborone",
        "capitalLatLong": {
            "latitude": -24.628208,
            "longitude": 25.923147
        },
        "centroidLatLong": {
            "latitude": -22.328474,
            "longitude": 24.684866
        },
        "code": "BW",
        "codeThree": "BWA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bouvet Island",
        "capital": "Bouvet Island",
        "capitalLatLong": {
            "latitude": -54.43,
            "longitude": 3.38
        },
        "centroidLatLong": {
            "latitude": -54.423199,
            "longitude": 3.413194
        },
        "code": "BV",
        "codeThree": "BVT",
        "continent": "Atlantic Ocean",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Brazil",
        "capital": "Brasília",
        "capitalLatLong": {
            "latitude": -15.794229,
            "longitude": -47.882166
        },
        "centroidLatLong": {
            "latitude": -14.235004,
            "longitude": -51.92528
        },
        "code": "BR",
        "codeThree": "BRA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "British Indian Ocean Territory",
        "capital": "Camp Justice",
        "capitalLatLong": {
            "latitude": 21.3419,
            "longitude": 55.4778
        },
        "centroidLatLong": {
            "latitude": -6.343194,
            "longitude": 71.876519
        },
        "code": "IO",
        "codeThree": "IOT",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "British Virgin Islands",
        "capital": "Road Town",
        "capitalLatLong": {
            "latitude": 18.428612,
            "longitude": -64.618466
        },
        "centroidLatLong": {
            "latitude": 18.420695,
            "longitude": -64.639968
        },
        "code": "VG",
        "codeThree": "VGB",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Brunei",
        "capital": "Bandar Seri Begawan",
        "capitalLatLong": {
            "latitude": 4.903052,
            "longitude": 114.939821
        },
        "centroidLatLong": {
            "latitude": 4.535277,
            "longitude": 114.727669
        },
        "code": "BN",
        "codeThree": "BRN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Bulgaria",
        "capital": "Sofia",
        "capitalLatLong": {
            "latitude": 42.697708,
            "longitude": 23.321868
        },
        "centroidLatLong": {
            "latitude": 42.733883,
            "longitude": 25.48583
        },
        "code": "BG",
        "codeThree": "BGR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Burkina Faso",
        "capital": "Ouagadougou",
        "capitalLatLong": {
            "latitude": 12.371428,
            "longitude": -1.51966
        },
        "centroidLatLong": {
            "latitude": 12.238333,
            "longitude": -1.561593
        },
        "code": "BF",
        "codeThree": "BFA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Burundi",
        "capital": "Bujumbura",
        "capitalLatLong": {
            "latitude": -3.361378,
            "longitude": 29.359878
        },
        "centroidLatLong": {
            "latitude": -3.373056,
            "longitude": 29.918886
        },
        "code": "BI",
        "codeThree": "BDI",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cambodia",
        "capital": "Phnom Penh",
        "capitalLatLong": {
            "latitude": 11.544873,
            "longitude": 104.892167
        },
        "centroidLatLong": {
            "latitude": 12.565679,
            "longitude": 104.990963
        },
        "code": "KH",
        "codeThree": "KHM",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cameroon",
        "capital": "Yaoundé",
        "capitalLatLong": {
            "latitude": 3.848033,
            "longitude": 11.502075
        },
        "centroidLatLong": {
            "latitude": 7.369722,
            "longitude": 12.354722
        },
        "code": "CM",
        "codeThree": "CMR",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Canada",
        "capital": "Ottawa",
        "capitalLatLong": {
            "latitude": 45.42153,
            "longitude": -75.697193
        },
        "centroidLatLong": {
            "latitude": 56.130366,
            "longitude": -106.346771
        },
        "code": "CA",
        "codeThree": "CAN",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cape Verde",
        "capital": "Praia",
        "capitalLatLong": {
            "latitude": 14.93305,
            "longitude": -23.513327
        },
        "centroidLatLong": {
            "latitude": 16.002082,
            "longitude": -24.013197
        },
        "code": "CV",
        "codeThree": "CPV",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Cayman Islands",
        "capital": "George Town",
        "capitalLatLong": {
            "latitude": 19.286932,
            "longitude": -81.367439
        },
        "centroidLatLong": {
            "latitude": 19.513469,
            "longitude": -80.566956
        },
        "code": "KY",
        "codeThree": "CYM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Central African Republic",
        "capital": "Bangui",
        "capitalLatLong": {
            "latitude": 4.394674,
            "longitude": 18.55819
        },
        "centroidLatLong": {
            "latitude": 6.611111,
            "longitude": 20.939444
        },
        "code": "CF",
        "codeThree": "CAF",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Chad",
        "capital": "N'Djamena",
        "capitalLatLong": {
            "latitude": 12.134846,
            "longitude": 15.055742
        },
        "centroidLatLong": {
            "latitude": 15.454166,
            "longitude": 18.732207
        },
        "code": "TD",
        "codeThree": "TCD",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Chile",
        "capital": "Santiago",
        "capitalLatLong": {
            "latitude": -33.44889,
            "longitude": -70.669265
        },
        "centroidLatLong": {
            "latitude": -35.675147,
            "longitude": -71.542969
        },
        "code": "CL",
        "codeThree": "CHL",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "China",
        "capital": "Beijing",
        "capitalLatLong": {
            "latitude": 39.904211,
            "longitude": 116.407395
        },
        "centroidLatLong": {
            "latitude": 35.86166,
            "longitude": 104.195397
        },
        "code": "CN",
        "codeThree": "CHN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Christmas Island",
        "capital": "Flying Fish Cove",
        "capitalLatLong": {
            "latitude": -10.420686,
            "longitude": 105.679379
        },
        "centroidLatLong": {
            "latitude": -10.447525,
            "longitude": 105.690449
        },
        "code": "CX",
        "codeThree": "CXR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Cocos (Keeling) Islands",
        "capital": "West Island",
        "capitalLatLong": {
            "latitude": -12.188834,
            "longitude": 96.829316
        },
        "centroidLatLong": {
            "latitude": -12.164165,
            "longitude": 96.870956
        },
        "code": "CC",
        "codeThree": "CCK",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Colombia",
        "capital": "Bogotá",
        "capitalLatLong": {
            "latitude": 4.710989,
            "longitude": -74.072092
        },
        "centroidLatLong": {
            "latitude": 4.570868,
            "longitude": -74.297333
        },
        "code": "CO",
        "codeThree": "COL",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Comoros",
        "capital": "Moroni",
        "capitalLatLong": {
            "latitude": -11.717216,
            "longitude": 43.247315
        },
        "centroidLatLong": {
            "latitude": -11.875001,
            "longitude": 43.872219
        },
        "code": "KM",
        "codeThree": "COM",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Congo (DRC)",
        "capital": "Kinshasa",
        "capitalLatLong": {
            "latitude": -4.441931,
            "longitude": 15.266293
        },
        "centroidLatLong": {
            "latitude": -4.038333,
            "longitude": 21.758664
        },
        "code": "CD",
        "codeThree": "COD",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Congo (Republic)",
        "capital": "Brazzaville",
        "capitalLatLong": {
            "latitude": -4.26336,
            "longitude": 15.242885
        },
        "centroidLatLong": {
            "latitude": -0.228021,
            "longitude": 15.827659
        },
        "code": "CG",
        "codeThree": "COG",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cook Islands",
        "capital": "Avarua",
        "capitalLatLong": {
            "latitude": -21.212901,
            "longitude": -159.782306
        },
        "centroidLatLong": {
            "latitude": -21.236736,
            "longitude": -159.777671
        },
        "code": "CK",
        "codeThree": "COK",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Costa Rica",
        "capital": "San José",
        "capitalLatLong": {
            "latitude": 9.928069,
            "longitude": -84.090725
        },
        "centroidLatLong": {
            "latitude": 9.748917,
            "longitude": -83.753428
        },
        "code": "CR",
        "codeThree": "CRI",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cote d’Ivoire",
        "capital": "Yamoussoukro",
        "capitalLatLong": {
            "latitude": 6.827623,
            "longitude": -5.289343
        },
        "centroidLatLong": {
            "latitude": 7.539989,
            "longitude": -5.54708
        },
        "code": "CI",
        "codeThree": "CIV",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Croatia",
        "capital": "Zagreb ",
        "capitalLatLong": {
            "latitude": 45.815011,
            "longitude": 15.981919
        },
        "centroidLatLong": {
            "latitude": 45.1,
            "longitude": 15.2
        },
        "code": "HR",
        "codeThree": "HRV",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Cuba",
        "capital": "Havana",
        "capitalLatLong": {
            "latitude": 23.05407,
            "longitude": -82.345189
        },
        "centroidLatLong": {
            "latitude": 21.521757,
            "longitude": -77.781167
        },
        "code": "CU",
        "codeThree": "CUB",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Curacao",
        "capital": "Willemstad",
        "capitalLatLong": {
            "latitude": 12.122422,
            "longitude": -68.882423
        },
        "centroidLatLong": {
            "latitude": 12.122422,
            "longitude": -68.882423
        },
        "code": "CW",
        "codeThree": "CUW",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Cyprus",
        "capital": "Nicosia",
        "capitalLatLong": {
            "latitude": 35.185566,
            "longitude": 33.382276
        },
        "centroidLatLong": {
            "latitude": 35.126413,
            "longitude": 33.429859
        },
        "code": "CY",
        "codeThree": "CYP",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Czechia",
        "capital": "Prague",
        "capitalLatLong": {
            "latitude": 50.075538,
            "longitude": 14.4378
        },
        "centroidLatLong": {
            "latitude": 49.817492,
            "longitude": 15.472962
        },
        "code": "CZ",
        "codeThree": "CZE",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Denmark",
        "capital": "Copenhagen",
        "capitalLatLong": {
            "latitude": 55.676097,
            "longitude": 12.568337
        },
        "centroidLatLong": {
            "latitude": 56.26392,
            "longitude": 9.501785
        },
        "code": "DK",
        "codeThree": "DNK",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Djibouti",
        "capital": "Djibouti",
        "capitalLatLong": {
            "latitude": 11.572077,
            "longitude": 43.145647
        },
        "centroidLatLong": {
            "latitude": 11.825138,
            "longitude": 42.590275
        },
        "code": "DJ",
        "codeThree": "DJI",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Dominica",
        "capital": "Roseau",
        "capitalLatLong": {
            "latitude": 15.309168,
            "longitude": -61.379355
        },
        "centroidLatLong": {
            "latitude": 15.414999,
            "longitude": -61.370976
        },
        "code": "DM",
        "codeThree": "DMA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Dominican Republic",
        "capital": "Santo Domingo",
        "capitalLatLong": {
            "latitude": 18.486058,
            "longitude": -69.931212
        },
        "centroidLatLong": {
            "latitude": 18.735693,
            "longitude": -70.162651
        },
        "code": "DO",
        "codeThree": "DOM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Ecuador",
        "capital": "Quito",
        "capitalLatLong": {
            "latitude": -0.180653,
            "longitude": -78.467838
        },
        "centroidLatLong": {
            "latitude": -1.831239,
            "longitude": -78.183406
        },
        "code": "EC",
        "codeThree": "ECU",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Egypt",
        "capital": "Cairo",
        "capitalLatLong": {
            "latitude": 30.04442,
            "longitude": 31.235712
        },
        "centroidLatLong": {
            "latitude": 26.820553,
            "longitude": 30.802498
        },
        "code": "EG",
        "codeThree": "EGY",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "El Salvador",
        "capital": "San Salvador",
        "capitalLatLong": {
            "latitude": 13.69294,
            "longitude": -89.218191
        },
        "centroidLatLong": {
            "latitude": 13.794185,
            "longitude": -88.89653
        },
        "code": "SV",
        "codeThree": "SLV",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Equatorial Guinea",
        "capital": "Malabo",
        "capitalLatLong": {
            "latitude": 3.750412,
            "longitude": 8.737104
        },
        "centroidLatLong": {
            "latitude": 1.650801,
            "longitude": 10.267895
        },
        "code": "GQ",
        "codeThree": "GNQ",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Eritrea",
        "capital": "Asmara",
        "capitalLatLong": {
            "latitude": 15.322877,
            "longitude": 38.925052
        },
        "centroidLatLong": {
            "latitude": 15.179384,
            "longitude": 39.782334
        },
        "code": "ER",
        "codeThree": "ERI",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Estonia",
        "capital": "Tallinn",
        "capitalLatLong": {
            "latitude": 59.436961,
            "longitude": 24.753575
        },
        "centroidLatLong": {
            "latitude": 58.595272,
            "longitude": 25.013607
        },
        "code": "EE",
        "codeThree": "EST",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Ethiopia",
        "capital": "Addis Ababa",
        "capitalLatLong": {
            "latitude": 8.980603,
            "longitude": 38.757761
        },
        "centroidLatLong": {
            "latitude": 9.145,
            "longitude": 40.489673
        },
        "code": "ET",
        "codeThree": "ETH",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Falkland Islands",
        "capital": "Stanley",
        "capitalLatLong": {
            "latitude": -51.697713,
            "longitude": -57.851663
        },
        "centroidLatLong": {
            "latitude": -51.796253,
            "longitude": -59.523613
        },
        "code": "FK",
        "codeThree": "FLK",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Faroe Islands",
        "capital": "Tórshavn",
        "capitalLatLong": {
            "latitude": 62.007864,
            "longitude": -6.790982
        },
        "centroidLatLong": {
            "latitude": 61.892635,
            "longitude": -6.911806
        },
        "code": "FO",
        "codeThree": "FRO",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Fiji",
        "capital": "Suva",
        "capitalLatLong": {
            "latitude": -18.124809,
            "longitude": 178.450079
        },
        "centroidLatLong": {
            "latitude": -16.578193,
            "longitude": 179.414413
        },
        "code": "FJ",
        "codeThree": "FJI",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Finland",
        "capital": "Helsinki",
        "capitalLatLong": {
            "latitude": 60.173324,
            "longitude": 24.941025
        },
        "centroidLatLong": {
            "latitude": 61.92411,
            "longitude": 25.748151
        },
        "code": "FI",
        "codeThree": "FIN",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "France",
        "capital": "Paris",
        "capitalLatLong": {
            "latitude": 48.856614,
            "longitude": 2.352222
        },
        "centroidLatLong": {
            "latitude": 46.227638,
            "longitude": 2.213749
        },
        "code": "FR",
        "codeThree": "FRA",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "French Guiana",
        "capital": "Cayenne",
        "capitalLatLong": {
            "latitude": 4.92242,
            "longitude": -52.313453
        },
        "centroidLatLong": {
            "latitude": 3.933889,
            "longitude": -53.125782
        },
        "code": "GF",
        "codeThree": "GUF",
        "continent": "Americas",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "French Polynesia",
        "capital": "Papeete",
        "capitalLatLong": {
            "latitude": -17.551625,
            "longitude": -149.558476
        },
        "centroidLatLong": {
            "latitude": -17.679742,
            "longitude": -149.406843
        },
        "code": "PF",
        "codeThree": "PYF",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "French Southern Territories",
        "capital": "Saint-Pierre ",
        "capitalLatLong": {
            "latitude": -21.3419,
            "longitude": 55.4778
        },
        "centroidLatLong": {
            "latitude": -49.280366,
            "longitude": 69.348557
        },
        "code": "TF",
        "codeThree": "ATF",
        "continent": "Indian Ocean",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Gabon",
        "capital": "Libreville",
        "capitalLatLong": {
            "latitude": 0.416198,
            "longitude": 9.467268
        },
        "centroidLatLong": {
            "latitude": -0.803689,
            "longitude": 11.609444
        },
        "code": "GA",
        "codeThree": "GAB",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Gambia",
        "capital": "Banjul",
        "capitalLatLong": {
            "latitude": 13.454876,
            "longitude": -16.579032
        },
        "centroidLatLong": {
            "latitude": 13.443182,
            "longitude": -15.310139
        },
        "code": "GM",
        "codeThree": "GMB",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Georgia",
        "capital": "Tbilisi",
        "capitalLatLong": {
            "latitude": 41.715138,
            "longitude": 44.827096
        },
        "centroidLatLong": {
            "latitude": 42.315407,
            "longitude": 43.356892
        },
        "code": "GE",
        "codeThree": "GEO",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Germany",
        "capital": "Berlin",
        "capitalLatLong": {
            "latitude": 52.520007,
            "longitude": 13.404954
        },
        "centroidLatLong": {
            "latitude": 51.165691,
            "longitude": 10.451526
        },
        "code": "DE",
        "codeThree": "DEU",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Ghana",
        "capital": "Accra",
        "capitalLatLong": {
            "latitude": 5.603717,
            "longitude": -0.186964
        },
        "centroidLatLong": {
            "latitude": 7.946527,
            "longitude": -1.023194
        },
        "code": "GH",
        "codeThree": "GHA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Gibraltar",
        "capital": "Gibraltar",
        "capitalLatLong": {
            "latitude": 36.140773,
            "longitude": -5.353599
        },
        "centroidLatLong": {
            "latitude": 36.137741,
            "longitude": -5.345374
        },
        "code": "GI",
        "codeThree": "GIB",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Greece",
        "capital": "Athens",
        "capitalLatLong": {
            "latitude": 37.983917,
            "longitude": 23.72936
        },
        "centroidLatLong": {
            "latitude": 39.074208,
            "longitude": 21.824312
        },
        "code": "GR",
        "codeThree": "GRC",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Greenland",
        "capital": "Nuuk",
        "capitalLatLong": {
            "latitude": 64.18141,
            "longitude": -51.694138
        },
        "centroidLatLong": {
            "latitude": 71.706936,
            "longitude": -42.604303
        },
        "code": "GL",
        "codeThree": "GRL",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Grenada",
        "capital": "St. George's",
        "capitalLatLong": {
            "latitude": 12.056098,
            "longitude": -61.7488
        },
        "centroidLatLong": {
            "latitude": 12.262776,
            "longitude": -61.604171
        },
        "code": "GD",
        "codeThree": "GRD",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Guadeloupe",
        "capital": "Basse-Terre",
        "capitalLatLong": {
            "latitude": 16.014453,
            "longitude": -61.706411
        },
        "centroidLatLong": {
            "latitude": 16.995971,
            "longitude": -62.067641
        },
        "code": "GP",
        "codeThree": "GLP",
        "continent": "Americas",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Guam",
        "capital": "Hagåtña",
        "capitalLatLong": {
            "latitude": 13.470891,
            "longitude": 144.751278
        },
        "centroidLatLong": {
            "latitude": 13.444304,
            "longitude": 144.793731
        },
        "code": "GU",
        "codeThree": "GUM",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Guatemala",
        "capital": "Guatemala City",
        "capitalLatLong": {
            "latitude": 14.634915,
            "longitude": -90.506882
        },
        "centroidLatLong": {
            "latitude": 15.783471,
            "longitude": -90.230759
        },
        "code": "GT",
        "codeThree": "GTM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Guernsey",
        "capital": "St. Peter Port",
        "capitalLatLong": {
            "latitude": 49.455443,
            "longitude": -2.536871
        },
        "centroidLatLong": {
            "latitude": 49.465691,
            "longitude": -2.585278
        },
        "code": "GG",
        "codeThree": "GGY",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Guinea",
        "capital": "Conakry",
        "capitalLatLong": {
            "latitude": 9.641185,
            "longitude": -13.578401
        },
        "centroidLatLong": {
            "latitude": 9.945587,
            "longitude": -9.696645
        },
        "code": "GN",
        "codeThree": "GIN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Guinea-Bissau",
        "capital": "Bissau",
        "capitalLatLong": {
            "latitude": 11.881655,
            "longitude": -15.617794
        },
        "centroidLatLong": {
            "latitude": 11.803749,
            "longitude": -15.180413
        },
        "code": "GW",
        "codeThree": "GNB",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Guyana",
        "capital": "Georgetown",
        "capitalLatLong": {
            "latitude": 6.801279,
            "longitude": -58.155125
        },
        "centroidLatLong": {
            "latitude": 4.860416,
            "longitude": -58.93018
        },
        "code": "GY",
        "codeThree": "GUY",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Haiti",
        "capital": "Port-au-Prince",
        "capitalLatLong": {
            "latitude": 18.594395,
            "longitude": -72.307433
        },
        "centroidLatLong": {
            "latitude": 18.971187,
            "longitude": -72.285215
        },
        "code": "HT",
        "codeThree": "HTI",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Honduras",
        "capital": "Tegucigalpa",
        "capitalLatLong": {
            "latitude": 14.072275,
            "longitude": -87.192136
        },
        "centroidLatLong": {
            "latitude": 15.199999,
            "longitude": -86.241905
        },
        "code": "HN",
        "codeThree": "HND",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Hong Kong",
        "capital": "Hong Kong",
        "capitalLatLong": {
            "latitude": 22.396428,
            "longitude": 114.109497
        },
        "centroidLatLong": {
            "latitude": 22.396428,
            "longitude": 114.109497
        },
        "code": "HK",
        "codeThree": "HKG",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Hungary",
        "capital": "Budapest",
        "capitalLatLong": {
            "latitude": 47.497912,
            "longitude": 19.040235
        },
        "centroidLatLong": {
            "latitude": 47.162494,
            "longitude": 19.503304
        },
        "code": "HU",
        "codeThree": "HUN",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Iceland",
        "capital": "Reykjavík",
        "capitalLatLong": {
            "latitude": 64.126521,
            "longitude": -21.817439
        },
        "centroidLatLong": {
            "latitude": 64.963051,
            "longitude": -19.020835
        },
        "code": "IS",
        "codeThree": "ISL",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "India",
        "capital": "New Delhi",
        "capitalLatLong": {
            "latitude": 28.613939,
            "longitude": 77.209021
        },
        "centroidLatLong": {
            "latitude": 20.593684,
            "longitude": 78.96288
        },
        "code": "IN",
        "codeThree": "IND",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Indonesia",
        "capital": "Jakarta",
        "capitalLatLong": {
            "latitude": -6.208763,
            "longitude": 106.845599
        },
        "centroidLatLong": {
            "latitude": -0.789275,
            "longitude": 113.921327
        },
        "code": "ID",
        "codeThree": "IDN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Iran",
        "capital": "Tehran",
        "capitalLatLong": {
            "latitude": 35.689198,
            "longitude": 51.388974
        },
        "centroidLatLong": {
            "latitude": 32.427908,
            "longitude": 53.688046
        },
        "code": "IR",
        "codeThree": "IRN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Iraq",
        "capital": "Baghdad",
        "capitalLatLong": {
            "latitude": 33.312806,
            "longitude": 44.361488
        },
        "centroidLatLong": {
            "latitude": 33.223191,
            "longitude": 43.679291
        },
        "code": "IQ",
        "codeThree": "IRQ",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Ireland",
        "capital": "Dublin",
        "capitalLatLong": {
            "latitude": 53.349805,
            "longitude": -6.26031
        },
        "centroidLatLong": {
            "latitude": 53.41291,
            "longitude": -8.24389
        },
        "code": "IE",
        "codeThree": "IRL",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Isle of Man",
        "capital": "Douglas",
        "capitalLatLong": {
            "latitude": 54.152337,
            "longitude": -4.486123
        },
        "centroidLatLong": {
            "latitude": 54.236107,
            "longitude": -4.548056
        },
        "code": "IM",
        "codeThree": "IMN",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Israel",
        "capital": "Tel Aviv",
        "capitalLatLong": {
            "latitude": 32.0853,
            "longitude": 34.781768
        },
        "centroidLatLong": {
            "latitude": 31.046051,
            "longitude": 34.851612
        },
        "code": "IL",
        "codeThree": "ISR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Italy",
        "capital": "Rome",
        "capitalLatLong": {
            "latitude": 41.902784,
            "longitude": 12.496366
        },
        "centroidLatLong": {
            "latitude": 41.87194,
            "longitude": 12.56738
        },
        "code": "IT",
        "codeThree": "ITA",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Jamaica",
        "capital": "Kingston",
        "capitalLatLong": {
            "latitude": 18.042327,
            "longitude": -76.802893
        },
        "centroidLatLong": {
            "latitude": 18.109581,
            "longitude": -77.297508
        },
        "code": "JM",
        "codeThree": "JAM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Japan",
        "capital": "Tokyo",
        "capitalLatLong": {
            "latitude": 35.709026,
            "longitude": 139.731992
        },
        "centroidLatLong": {
            "latitude": 36.204824,
            "longitude": 138.252924
        },
        "code": "JP",
        "codeThree": "JPN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Jersey",
        "capital": "St. Helier",
        "capitalLatLong": {
            "latitude": 49.186823,
            "longitude": -2.106568
        },
        "centroidLatLong": {
            "latitude": 49.214439,
            "longitude": -2.13125
        },
        "code": "JE",
        "codeThree": "JEY",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Jordan",
        "capital": "Amman",
        "capitalLatLong": {
            "latitude": 31.956578,
            "longitude": 35.945695
        },
        "centroidLatLong": {
            "latitude": 30.585164,
            "longitude": 36.238414
        },
        "code": "JO",
        "codeThree": "JOR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Kazakhstan",
        "capital": "Astana",
        "capitalLatLong": {
            "latitude": 51.160523,
            "longitude": 71.470356
        },
        "centroidLatLong": {
            "latitude": 48.019573,
            "longitude": 66.923684
        },
        "code": "KZ",
        "codeThree": "KAZ",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Kenya",
        "capital": "Nairobi",
        "capitalLatLong": {
            "latitude": -1.292066,
            "longitude": 36.821946
        },
        "centroidLatLong": {
            "latitude": -0.023559,
            "longitude": 37.906193
        },
        "code": "KE",
        "codeThree": "KEN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Kiribati",
        "capital": "Tarawa Atoll",
        "capitalLatLong": {
            "latitude": 1.451817,
            "longitude": 172.971662
        },
        "centroidLatLong": {
            "latitude": -3.370417,
            "longitude": -168.734039
        },
        "code": "KI",
        "codeThree": "KIR",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Kosovo",
        "capital": "Pristina",
        "capitalLatLong": {
            "latitude": 42.662914,
            "longitude": 21.165503
        },
        "centroidLatLong": {
            "latitude": 42.602636,
            "longitude": 20.902977
        },
        "code": "XK",
        "codeThree": "XXK",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Kuwait",
        "capital": "Kuwait City",
        "capitalLatLong": {
            "latitude": 29.375859,
            "longitude": 47.977405
        },
        "centroidLatLong": {
            "latitude": 29.31166,
            "longitude": 47.481766
        },
        "code": "KW",
        "codeThree": "KWT",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Kyrgyzstan",
        "capital": "Bishkek",
        "capitalLatLong": {
            "latitude": 42.874621,
            "longitude": 74.569762
        },
        "centroidLatLong": {
            "latitude": 41.20438,
            "longitude": 74.766098
        },
        "code": "KG",
        "codeThree": "KGZ",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Laos",
        "capital": "Vientiane",
        "capitalLatLong": {
            "latitude": 17.975706,
            "longitude": 102.633104
        },
        "centroidLatLong": {
            "latitude": 19.85627,
            "longitude": 102.495496
        },
        "code": "LA",
        "codeThree": "LAO",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Latvia",
        "capital": "Riga",
        "capitalLatLong": {
            "latitude": 56.949649,
            "longitude": 24.105186
        },
        "centroidLatLong": {
            "latitude": 56.879635,
            "longitude": 24.603189
        },
        "code": "LV",
        "codeThree": "LVA",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Lebanon",
        "capital": "Beirut",
        "capitalLatLong": {
            "latitude": 33.888629,
            "longitude": 35.495479
        },
        "centroidLatLong": {
            "latitude": 33.854721,
            "longitude": 35.862285
        },
        "code": "LB",
        "codeThree": "LBN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Lesotho",
        "capital": "Maseru",
        "capitalLatLong": {
            "latitude": -29.363219,
            "longitude": 27.51436
        },
        "centroidLatLong": {
            "latitude": -29.609988,
            "longitude": 28.233608
        },
        "code": "LS",
        "codeThree": "LSO",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Liberia",
        "capital": "Monrovia",
        "capitalLatLong": {
            "latitude": 6.290743,
            "longitude": -10.760524
        },
        "centroidLatLong": {
            "latitude": 6.428055,
            "longitude": -9.429499
        },
        "code": "LR",
        "codeThree": "LBR",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Libya",
        "capital": "Tripoli",
        "capitalLatLong": {
            "latitude": 32.887209,
            "longitude": 13.191338
        },
        "centroidLatLong": {
            "latitude": 26.3351,
            "longitude": 17.228331
        },
        "code": "LY",
        "codeThree": "LBY",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Liechtenstein",
        "capital": "Vaduz",
        "capitalLatLong": {
            "latitude": 47.14103,
            "longitude": 9.520928
        },
        "centroidLatLong": {
            "latitude": 47.166,
            "longitude": 9.555373
        },
        "code": "LI",
        "codeThree": "LIE",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Lithuania",
        "capital": "Vilnius",
        "capitalLatLong": {
            "latitude": 54.687156,
            "longitude": 25.279651
        },
        "centroidLatLong": {
            "latitude": 55.169438,
            "longitude": 23.881275
        },
        "code": "LT",
        "codeThree": "LTU",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Luxembourg",
        "capital": "Luxembourg",
        "capitalLatLong": {
            "latitude": 49.611621,
            "longitude": 6.131935
        },
        "centroidLatLong": {
            "latitude": 49.815273,
            "longitude": 6.129583
        },
        "code": "LU",
        "codeThree": "LUX",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Macau",
        "capital": "Macau",
        "capitalLatLong": {
            "latitude": 22.166667,
            "longitude": 113.55
        },
        "centroidLatLong": {
            "latitude": 22.198745,
            "longitude": 113.543873
        },
        "code": "MO",
        "codeThree": "MAC",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Republic of North Macedonia",
        "capital": "Skopje",
        "capitalLatLong": {
            "latitude": 41.997346,
            "longitude": 21.427996
        },
        "centroidLatLong": {
            "latitude": 41.608635,
            "longitude": 21.745275
        },
        "code": "MK",
        "codeThree": "MKD",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Madagascar",
        "capital": "Antananarivo",
        "capitalLatLong": {
            "latitude": -18.87919,
            "longitude": 47.507905
        },
        "centroidLatLong": {
            "latitude": -18.766947,
            "longitude": 46.869107
        },
        "code": "MG",
        "codeThree": "MDG",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Malawi",
        "capital": "Lilongwe",
        "capitalLatLong": {
            "latitude": -13.962612,
            "longitude": 33.774119
        },
        "centroidLatLong": {
            "latitude": -13.254308,
            "longitude": 34.301525
        },
        "code": "MW",
        "codeThree": "MWI",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Malaysia",
        "capital": "Kuala Lumpur",
        "capitalLatLong": {
            "latitude": 3.139003,
            "longitude": 101.686855
        },
        "centroidLatLong": {
            "latitude": 4.210484,
            "longitude": 101.975766
        },
        "code": "MY",
        "codeThree": "MYS",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Maldives",
        "capital": "Malé",
        "capitalLatLong": {
            "latitude": 4.175496,
            "longitude": 73.509347
        },
        "centroidLatLong": {
            "latitude": 3.202778,
            "longitude": 73.22068
        },
        "code": "MV",
        "codeThree": "MDV",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Mali",
        "capital": "Bamako",
        "capitalLatLong": {
            "latitude": 12.639232,
            "longitude": -8.002889
        },
        "centroidLatLong": {
            "latitude": 17.570692,
            "longitude": -3.996166
        },
        "code": "ML",
        "codeThree": "MLI",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Malta",
        "capital": "Valletta",
        "capitalLatLong": {
            "latitude": 35.898909,
            "longitude": 14.514553
        },
        "centroidLatLong": {
            "latitude": 35.937496,
            "longitude": 14.375416
        },
        "code": "MT",
        "codeThree": "MLT",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Marshall Islands",
        "capital": "Majuro",
        "capitalLatLong": {
            "latitude": 7.116421,
            "longitude": 171.185774
        },
        "centroidLatLong": {
            "latitude": 7.131474,
            "longitude": 171.184478
        },
        "code": "MH",
        "codeThree": "MHL",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Martinique",
        "capital": "Fort-de-France",
        "capitalLatLong": {
            "latitude": 14.616065,
            "longitude": -61.05878
        },
        "centroidLatLong": {
            "latitude": 14.641528,
            "longitude": -61.024174
        },
        "code": "MQ",
        "codeThree": "MTQ",
        "continent": "Americas",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Mauritania",
        "capital": "Nouakchott",
        "capitalLatLong": {
            "latitude": 18.07353,
            "longitude": -15.958237
        },
        "centroidLatLong": {
            "latitude": 21.00789,
            "longitude": -10.940835
        },
        "code": "MR",
        "codeThree": "MRT",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Mauritius",
        "capital": "Port Louis",
        "capitalLatLong": {
            "latitude": -20.166896,
            "longitude": 57.502332
        },
        "centroidLatLong": {
            "latitude": -20.348404,
            "longitude": 57.552152
        },
        "code": "MU",
        "codeThree": "MUS",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Mayotte",
        "capital": "Mamoudzou",
        "capitalLatLong": {
            "latitude": -12.780949,
            "longitude": 45.227872
        },
        "centroidLatLong": {
            "latitude": -12.8275,
            "longitude": 45.166244
        },
        "code": "YT",
        "codeThree": "MYT",
        "continent": "Africa",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Mexico",
        "capital": "Mexico City",
        "capitalLatLong": {
            "latitude": 19.432608,
            "longitude": -99.133208
        },
        "centroidLatLong": {
            "latitude": 23.634501,
            "longitude": -102.552784
        },
        "code": "MX",
        "codeThree": "MEX",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Micronesia",
        "capital": "Palikir",
        "capitalLatLong": {
            "latitude": 6.914712,
            "longitude": 158.161027
        },
        "centroidLatLong": {
            "latitude": 7.425554,
            "longitude": 150.550812
        },
        "code": "FM",
        "codeThree": "FSM",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Moldova",
        "capital": "Chisinau",
        "capitalLatLong": {
            "latitude": 47.010453,
            "longitude": 28.86381
        },
        "centroidLatLong": {
            "latitude": 47.411631,
            "longitude": 28.369885
        },
        "code": "MD",
        "codeThree": "MDA",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Monaco",
        "capital": "Monaco",
        "capitalLatLong": {
            "latitude": 43.737411,
            "longitude": 7.420816
        },
        "centroidLatLong": {
            "latitude": 43.750298,
            "longitude": 7.412841
        },
        "code": "MC",
        "codeThree": "MCO",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Mongolia",
        "capital": "Ulaanbaatar",
        "capitalLatLong": {
            "latitude": 47.886399,
            "longitude": 106.905744
        },
        "centroidLatLong": {
            "latitude": 46.862496,
            "longitude": 103.846656
        },
        "code": "MN",
        "codeThree": "MNG",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Montenegro",
        "capital": "Podgorica",
        "capitalLatLong": {
            "latitude": 42.43042,
            "longitude": 19.259364
        },
        "centroidLatLong": {
            "latitude": 42.708678,
            "longitude": 19.37439
        },
        "code": "ME",
        "codeThree": "MNE",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Montserrat",
        "capital": "Plymouth",
        "capitalLatLong": {
            "latitude": 16.706523,
            "longitude": -62.215738
        },
        "centroidLatLong": {
            "latitude": 16.742498,
            "longitude": -62.187366
        },
        "code": "MS",
        "codeThree": "MSR",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Morocco",
        "capital": "Rabat",
        "capitalLatLong": {
            "latitude": 33.97159,
            "longitude": -6.849813
        },
        "centroidLatLong": {
            "latitude": 31.791702,
            "longitude": -7.09262
        },
        "code": "MA",
        "codeThree": "MAR",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Mozambique",
        "capital": "Maputo",
        "capitalLatLong": {
            "latitude": -25.891968,
            "longitude": 32.605135
        },
        "centroidLatLong": {
            "latitude": -18.665695,
            "longitude": 35.529562
        },
        "code": "MZ",
        "codeThree": "MOZ",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Myanmar",
        "capital": "Naypyidaw",
        "capitalLatLong": {
            "latitude": 19.763306,
            "longitude": 96.07851
        },
        "centroidLatLong": {
            "latitude": 21.913965,
            "longitude": 95.956223
        },
        "code": "MM",
        "codeThree": "MMR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Namibia",
        "capital": "Windhoek",
        "capitalLatLong": {
            "latitude": -22.560881,
            "longitude": 17.065755
        },
        "centroidLatLong": {
            "latitude": -22.95764,
            "longitude": 18.49041
        },
        "code": "NA",
        "codeThree": "NAM",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Nauru",
        "capital": "Yaren",
        "capitalLatLong": {
            "latitude": -0.546686,
            "longitude": 166.921091
        },
        "centroidLatLong": {
            "latitude": -0.522778,
            "longitude": 166.931503
        },
        "code": "NR",
        "codeThree": "NRU",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Nepal",
        "capital": "Kathmandu",
        "capitalLatLong": {
            "latitude": 27.717245,
            "longitude": 85.323961
        },
        "centroidLatLong": {
            "latitude": 28.394857,
            "longitude": 84.124008
        },
        "code": "NP",
        "codeThree": "NPL",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Netherlands",
        "capital": "Amsterdam",
        "capitalLatLong": {
            "latitude": 52.370216,
            "longitude": 4.895168
        },
        "centroidLatLong": {
            "latitude": 52.132633,
            "longitude": 5.291266
        },
        "code": "NL",
        "codeThree": "NLD",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Netherlands Antilles",
        "capital": "Willemstad ",
        "capitalLatLong": {
            "latitude": 12.1091242,
            "longitude": -68.9316546
        },
        "centroidLatLong": {
            "latitude": 12.226079,
            "longitude": -69.060087
        },
        "code": "AN",
        "codeThree": "ANT",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "New Caledonia",
        "capital": "Nouméa",
        "capitalLatLong": {
            "latitude": -22.255823,
            "longitude": 166.450524
        },
        "centroidLatLong": {
            "latitude": -20.904305,
            "longitude": 165.618042
        },
        "code": "NC",
        "codeThree": "NCL",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "New Zealand",
        "capital": "Wellington",
        "capitalLatLong": {
            "latitude": -41.28646,
            "longitude": 174.776236
        },
        "centroidLatLong": {
            "latitude": -40.900557,
            "longitude": 174.885971
        },
        "code": "NZ",
        "codeThree": "NZL",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Nicaragua",
        "capital": "Managua",
        "capitalLatLong": {
            "latitude": 12.114993,
            "longitude": -86.236174
        },
        "centroidLatLong": {
            "latitude": 12.865416,
            "longitude": -85.207229
        },
        "code": "NI",
        "codeThree": "NIC",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Niger",
        "capital": "Niamey",
        "capitalLatLong": {
            "latitude": 13.511596,
            "longitude": 2.125385
        },
        "centroidLatLong": {
            "latitude": 17.607789,
            "longitude": 8.081666
        },
        "code": "NE",
        "codeThree": "NER",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Nigeria",
        "capital": "Abuja",
        "capitalLatLong": {
            "latitude": 9.076479,
            "longitude": 7.398574
        },
        "centroidLatLong": {
            "latitude": 9.081999,
            "longitude": 8.675277
        },
        "code": "NG",
        "codeThree": "NGA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Niue",
        "capital": "Alofi",
        "capitalLatLong": {
            "latitude": -19.055371,
            "longitude": -169.917871
        },
        "centroidLatLong": {
            "latitude": -19.054445,
            "longitude": -169.867233
        },
        "code": "NU",
        "codeThree": "NIU",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Norfolk Island",
        "capital": "Kingston",
        "capitalLatLong": {
            "latitude": -29.056394,
            "longitude": 167.959588
        },
        "centroidLatLong": {
            "latitude": -29.040835,
            "longitude": 167.954712
        },
        "code": "NF",
        "codeThree": "NFK",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "North Korea",
        "capital": "Pyongyang",
        "capitalLatLong": {
            "latitude": 39.039219,
            "longitude": 125.762524
        },
        "centroidLatLong": {
            "latitude": 40.339852,
            "longitude": 127.510093
        },
        "code": "KP",
        "codeThree": "PRK",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Northern Mariana Islands",
        "capital": "Saipan",
        "capitalLatLong": {
            "latitude": 15.177801,
            "longitude": 145.750967
        },
        "centroidLatLong": {
            "latitude": 17.33083,
            "longitude": 145.38469
        },
        "code": "MP",
        "codeThree": "MNP",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Norway",
        "capital": "Oslo",
        "capitalLatLong": {
            "latitude": 59.913869,
            "longitude": 10.752245
        },
        "centroidLatLong": {
            "latitude": 60.472024,
            "longitude": 8.468946
        },
        "code": "NO",
        "codeThree": "NOR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Oman",
        "capital": "Muscat",
        "capitalLatLong": {
            "latitude": 23.58589,
            "longitude": 58.405923
        },
        "centroidLatLong": {
            "latitude": 21.512583,
            "longitude": 55.923255
        },
        "code": "OM",
        "codeThree": "OMN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Pakistan",
        "capital": "Islamabad",
        "capitalLatLong": {
            "latitude": 33.729388,
            "longitude": 73.093146
        },
        "centroidLatLong": {
            "latitude": 30.375321,
            "longitude": 69.345116
        },
        "code": "PK",
        "codeThree": "PAK",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Palau",
        "capital": "Ngerulmud",
        "capitalLatLong": {
            "latitude": 7.500384,
            "longitude": 134.624289
        },
        "centroidLatLong": {
            "latitude": 7.51498,
            "longitude": 134.58252
        },
        "code": "PW",
        "codeThree": "PLW",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Panama",
        "capital": "Panama City",
        "capitalLatLong": {
            "latitude": 9.101179,
            "longitude": -79.402864
        },
        "centroidLatLong": {
            "latitude": 8.537981,
            "longitude": -80.782127
        },
        "code": "PA",
        "codeThree": "PAN",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Papua New Guinea",
        "capital": "Port Moresby",
        "capitalLatLong": {
            "latitude": -9.4438,
            "longitude": 147.180267
        },
        "centroidLatLong": {
            "latitude": -6.314993,
            "longitude": 143.95555
        },
        "code": "PG",
        "codeThree": "PNG",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Paraguay",
        "capital": "Asuncion",
        "capitalLatLong": {
            "latitude": -25.26374,
            "longitude": -57.575926
        },
        "centroidLatLong": {
            "latitude": -23.442503,
            "longitude": -58.443832
        },
        "code": "PY",
        "codeThree": "PRY",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Peru",
        "capital": "Lima",
        "capitalLatLong": {
            "latitude": -12.046374,
            "longitude": -77.042793
        },
        "centroidLatLong": {
            "latitude": -9.189967,
            "longitude": -75.015152
        },
        "code": "PE",
        "codeThree": "PER",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Philippines",
        "capital": "Manila",
        "capitalLatLong": {
            "latitude": 14.599512,
            "longitude": 120.98422
        },
        "centroidLatLong": {
            "latitude": 12.879721,
            "longitude": 121.774017
        },
        "code": "PH",
        "codeThree": "PHL",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Pitcairn Islands",
        "capital": "Adamstown",
        "capitalLatLong": {
            "latitude": -25.06629,
            "longitude": -130.100464
        },
        "centroidLatLong": {
            "latitude": -24.703615,
            "longitude": -127.439308
        },
        "code": "PN",
        "codeThree": "PCN",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Poland",
        "capital": "Warsaw",
        "capitalLatLong": {
            "latitude": 52.229676,
            "longitude": 21.012229
        },
        "centroidLatLong": {
            "latitude": 51.919438,
            "longitude": 19.145136
        },
        "code": "PL",
        "codeThree": "POL",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Portugal",
        "capital": "Lisbon",
        "capitalLatLong": {
            "latitude": 38.722252,
            "longitude": -9.139337
        },
        "centroidLatLong": {
            "latitude": 39.399872,
            "longitude": -8.224454
        },
        "code": "PT",
        "codeThree": "PRT",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Puerto Rico",
        "capital": "San Juan",
        "capitalLatLong": {
            "latitude": 18.466334,
            "longitude": -66.105722
        },
        "centroidLatLong": {
            "latitude": 18.220833,
            "longitude": -66.590149
        },
        "code": "PR",
        "codeThree": "PRI",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Qatar",
        "capital": "Doha",
        "capitalLatLong": {
            "latitude": 25.285447,
            "longitude": 51.53104
        },
        "centroidLatLong": {
            "latitude": 25.354826,
            "longitude": 51.183884
        },
        "code": "QA",
        "codeThree": "QAT",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Reunion",
        "capital": "Saint-Denis",
        "capitalLatLong": {
            "latitude": -20.882057,
            "longitude": 55.450675
        },
        "centroidLatLong": {
            "latitude": -21.115141,
            "longitude": 55.536384
        },
        "code": "RE",
        "codeThree": "REU",
        "continent": "Africa",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Romania",
        "capital": "Bucharest",
        "capitalLatLong": {
            "latitude": 44.426767,
            "longitude": 26.102538
        },
        "centroidLatLong": {
            "latitude": 45.943161,
            "longitude": 24.96676
        },
        "code": "RO",
        "codeThree": "ROU",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Russia",
        "capital": "Moscow",
        "capitalLatLong": {
            "latitude": 55.755826,
            "longitude": 37.6173
        },
        "centroidLatLong": {
            "latitude": 61.52401,
            "longitude": 105.318756
        },
        "code": "RU",
        "codeThree": "RUS",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Rwanda",
        "capital": "Kigali",
        "capitalLatLong": {
            "latitude": -1.957875,
            "longitude": 30.112735
        },
        "centroidLatLong": {
            "latitude": -1.940278,
            "longitude": 29.873888
        },
        "code": "RW",
        "codeThree": "RWA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Saint Pierre and Miquelon",
        "capital": "St. Pierre",
        "capitalLatLong": {
            "latitude": 46.775846,
            "longitude": -56.180636
        },
        "centroidLatLong": {
            "latitude": 46.941936,
            "longitude": -56.27111
        },
        "code": "PM",
        "codeThree": "SPM",
        "continent": "Americas",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "capital": "Kingstown",
        "capitalLatLong": {
            "latitude": 13.160025,
            "longitude": -61.224816
        },
        "centroidLatLong": {
            "latitude": 12.984305,
            "longitude": -61.287228
        },
        "code": "VC",
        "codeThree": "VCT",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Samoa",
        "capital": "Apia",
        "capitalLatLong": {
            "latitude": -13.850696,
            "longitude": -171.751355
        },
        "centroidLatLong": {
            "latitude": -13.759029,
            "longitude": -172.104629
        },
        "code": "WS",
        "codeThree": "WSM",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "San Marino",
        "capital": "San Marino",
        "capitalLatLong": {
            "latitude": 43.935591,
            "longitude": 12.447281
        },
        "centroidLatLong": {
            "latitude": 43.94236,
            "longitude": 12.457777
        },
        "code": "SM",
        "codeThree": "SMR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Sao Tome and Príncipe",
        "capital": "São Tomé",
        "capitalLatLong": {
            "latitude": 0.330192,
            "longitude": 6.733343
        },
        "centroidLatLong": {
            "latitude": 0.18636,
            "longitude": 6.613081
        },
        "code": "ST",
        "codeThree": "STP",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Saudi Arabia",
        "capital": "Riyadh",
        "capitalLatLong": {
            "latitude": 24.749403,
            "longitude": 46.902838
        },
        "centroidLatLong": {
            "latitude": 23.885942,
            "longitude": 45.079162
        },
        "code": "SA",
        "codeThree": "SAU",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Senegal",
        "capital": "Dakar",
        "capitalLatLong": {
            "latitude": 14.764504,
            "longitude": -17.366029
        },
        "centroidLatLong": {
            "latitude": 14.497401,
            "longitude": -14.452362
        },
        "code": "SN",
        "codeThree": "SEN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Serbia",
        "capital": "Belgrade",
        "capitalLatLong": {
            "latitude": 44.786568,
            "longitude": 20.448922
        },
        "centroidLatLong": {
            "latitude": 44.016521,
            "longitude": 21.005859
        },
        "code": "RS",
        "codeThree": "SRB",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Seychelles",
        "capital": "Victoria",
        "capitalLatLong": {
            "latitude": -4.619143,
            "longitude": 55.451315
        },
        "centroidLatLong": {
            "latitude": -4.679574,
            "longitude": 55.491977
        },
        "code": "SC",
        "codeThree": "SYC",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Sierra Leone",
        "capital": "Freetown",
        "capitalLatLong": {
            "latitude": 8.465677,
            "longitude": -13.231722
        },
        "centroidLatLong": {
            "latitude": 8.460555,
            "longitude": -11.779889
        },
        "code": "SL",
        "codeThree": "SLE",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Singapore",
        "capital": "Singapore",
        "capitalLatLong": {
            "latitude": 1.280095,
            "longitude": 103.850949
        },
        "centroidLatLong": {
            "latitude": 1.352083,
            "longitude": 103.819836
        },
        "code": "SG",
        "codeThree": "SGP",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Slovakia",
        "capital": "Bratislava",
        "capitalLatLong": {
            "latitude": 48.145892,
            "longitude": 17.107137
        },
        "centroidLatLong": {
            "latitude": 48.669026,
            "longitude": 19.699024
        },
        "code": "SK",
        "codeThree": "SVK",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Slovenia",
        "capital": "Ljubljana",
        "capitalLatLong": {
            "latitude": 46.056947,
            "longitude": 14.505751
        },
        "centroidLatLong": {
            "latitude": 46.151241,
            "longitude": 14.995463
        },
        "code": "SI",
        "codeThree": "SVN",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Solomon Islands",
        "capital": "Honiara",
        "capitalLatLong": {
            "latitude": -9.445638,
            "longitude": 159.9729
        },
        "centroidLatLong": {
            "latitude": -9.64571,
            "longitude": 160.156194
        },
        "code": "SB",
        "codeThree": "SLB",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Somalia",
        "capital": "Mogadishu",
        "capitalLatLong": {
            "latitude": 2.046934,
            "longitude": 45.318162
        },
        "centroidLatLong": {
            "latitude": 5.152149,
            "longitude": 46.199616
        },
        "code": "SO",
        "codeThree": "SOM",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "South Africa",
        "capital": "Pretoria",
        "capitalLatLong": {
            "latitude": -25.747868,
            "longitude": 28.229271
        },
        "centroidLatLong": {
            "latitude": -30.559482,
            "longitude": 22.937506
        },
        "code": "ZA",
        "codeThree": "ZAF",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "capital": "King Edward Point",
        "capitalLatLong": {
            "latitude": -54.28325,
            "longitude": -36.493735
        },
        "centroidLatLong": {
            "latitude": -54.429579,
            "longitude": -36.587909
        },
        "code": "GS",
        "codeThree": "SGS",
        "continent": "Atlantic Ocean",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "South Korea",
        "capital": "Seoul",
        "capitalLatLong": {
            "latitude": 37.566535,
            "longitude": 126.977969
        },
        "centroidLatLong": {
            "latitude": 35.907757,
            "longitude": 127.766922
        },
        "code": "KR",
        "codeThree": "KOR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "South Sudan",
        "capital": "Juba",
        "capitalLatLong": {
            "latitude": 4.859363,
            "longitude": 31.57125
        },
        "centroidLatLong": {
            "latitude": 4.859363,
            "longitude": 31.57125
        },
        "code": "SS",
        "codeThree": "SSD",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Spain",
        "capital": "Madrid",
        "capitalLatLong": {
            "latitude": 40.416775,
            "longitude": -3.70379
        },
        "centroidLatLong": {
            "latitude": 40.463667,
            "longitude": -3.74922
        },
        "code": "ES",
        "codeThree": "ESP",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Sri Lanka",
        "capital": "Sri Jayawardenepura Kotte",
        "capitalLatLong": {
            "latitude": 6.89407,
            "longitude": 79.902478
        },
        "centroidLatLong": {
            "latitude": 7.873054,
            "longitude": 80.771797
        },
        "code": "LK",
        "codeThree": "LKA",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Saint Barthelemy",
        "capital": "Gustavia",
        "capitalLatLong": {
            "latitude": 17.896435,
            "longitude": -62.852201
        },
        "centroidLatLong": {
            "latitude": 17.896435,
            "longitude": -62.852201
        },
        "code": "BL",
        "codeThree": "BLM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Saint Kitts and Nevis",
        "capital": "Basseterre",
        "capitalLatLong": {
            "latitude": 17.302606,
            "longitude": -62.717692
        },
        "centroidLatLong": {
            "latitude": 17.357822,
            "longitude": -62.782998
        },
        "code": "KN",
        "codeThree": "KNA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Saint Lucia",
        "capital": "Castries",
        "capitalLatLong": {
            "latitude": 14.010109,
            "longitude": -60.987469
        },
        "centroidLatLong": {
            "latitude": 13.909444,
            "longitude": -60.978893
        },
        "code": "LC",
        "codeThree": "LCA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Saint Martin",
        "capital": "Marigot",
        "capitalLatLong": {
            "latitude": 18.067519,
            "longitude": -63.082466
        },
        "centroidLatLong": {
            "latitude": 18.067519,
            "longitude": -63.082466
        },
        "code": "SX",
        "codeThree": "SXM",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Sudan",
        "capital": "Khartoum",
        "capitalLatLong": {
            "latitude": 15.500654,
            "longitude": 32.559899
        },
        "centroidLatLong": {
            "latitude": 12.862807,
            "longitude": 30.217636
        },
        "code": "SD",
        "codeThree": "SDN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Suriname",
        "capital": "Paramaribo",
        "capitalLatLong": {
            "latitude": 5.852036,
            "longitude": -55.203828
        },
        "centroidLatLong": {
            "latitude": 3.919305,
            "longitude": -56.027783
        },
        "code": "SR",
        "codeThree": "SUR",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Svalbard and Jan Mayen",
        "capital": "Longyearbyen ",
        "capitalLatLong": {
            "latitude": 78.062,
            "longitude": 22.055
        },
        "centroidLatLong": {
            "latitude": 77.553604,
            "longitude": 23.670272
        },
        "code": "SJ",
        "codeThree": "SJM",
        "continent": "Europe",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Eswatini (Swaziland)",
        "capital": "Mbabane",
        "capitalLatLong": {
            "latitude": -26.305448,
            "longitude": 31.136672
        },
        "centroidLatLong": {
            "latitude": -26.522503,
            "longitude": 31.465866
        },
        "code": "SZ",
        "codeThree": "SWZ",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Sweden",
        "capital": "Stockholm",
        "capitalLatLong": {
            "latitude": 59.329323,
            "longitude": 18.068581
        },
        "centroidLatLong": {
            "latitude": 60.128161,
            "longitude": 18.643501
        },
        "code": "SE",
        "codeThree": "SWE",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Switzerland",
        "capital": "Bern",
        "capitalLatLong": {
            "latitude": 46.947974,
            "longitude": 7.447447
        },
        "centroidLatLong": {
            "latitude": 46.818188,
            "longitude": 8.227512
        },
        "code": "CH",
        "codeThree": "CHE",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Syria",
        "capital": "Damascus",
        "capitalLatLong": {
            "latitude": 33.513807,
            "longitude": 36.276528
        },
        "centroidLatLong": {
            "latitude": 34.802075,
            "longitude": 38.996815
        },
        "code": "SY",
        "codeThree": "SYR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Taiwan",
        "capital": "Taipei",
        "capitalLatLong": {
            "latitude": 25.032969,
            "longitude": 121.565418
        },
        "centroidLatLong": {
            "latitude": 23.69781,
            "longitude": 120.960515
        },
        "code": "TW",
        "codeThree": "TWN",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Tajikistan",
        "capital": "Dushanbe",
        "capitalLatLong": {
            "latitude": 38.559772,
            "longitude": 68.787038
        },
        "centroidLatLong": {
            "latitude": 38.861034,
            "longitude": 71.276093
        },
        "code": "TJ",
        "codeThree": "TJK",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Tanzania",
        "capital": "Dodoma",
        "capitalLatLong": {
            "latitude": -6.162959,
            "longitude": 35.751607
        },
        "centroidLatLong": {
            "latitude": -6.369028,
            "longitude": 34.888822
        },
        "code": "TZ",
        "codeThree": "TZA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Thailand",
        "capital": "Bangkok",
        "capitalLatLong": {
            "latitude": 13.756331,
            "longitude": 100.501765
        },
        "centroidLatLong": {
            "latitude": 15.870032,
            "longitude": 100.992541
        },
        "code": "TH",
        "codeThree": "THA",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Timor-Leste",
        "capital": "Dili",
        "capitalLatLong": {
            "latitude": -8.556856,
            "longitude": 125.560314
        },
        "centroidLatLong": {
            "latitude": -8.874217,
            "longitude": 125.727539
        },
        "code": "TL",
        "codeThree": "TLS",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Togo",
        "capital": "Lomé",
        "capitalLatLong": {
            "latitude": 6.172497,
            "longitude": 1.231362
        },
        "centroidLatLong": {
            "latitude": 8.619543,
            "longitude": 0.824782
        },
        "code": "TG",
        "codeThree": "TGO",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Tokelau",
        "capital": "Nukunonu",
        "capitalLatLong": {
            "latitude": -9.2005,
            "longitude": -171.848
        },
        "centroidLatLong": {
            "latitude": -8.967363,
            "longitude": -171.855881
        },
        "code": "TK",
        "codeThree": "TKL",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Tonga",
        "capital": "Nuku'alofa",
        "capitalLatLong": {
            "latitude": -21.139342,
            "longitude": -175.204947
        },
        "centroidLatLong": {
            "latitude": -21.178986,
            "longitude": -175.198242
        },
        "code": "TO",
        "codeThree": "TON",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Trinidad and Tobago",
        "capital": "Port of Spain",
        "capitalLatLong": {
            "latitude": 10.654901,
            "longitude": -61.501926
        },
        "centroidLatLong": {
            "latitude": 10.691803,
            "longitude": -61.222503
        },
        "code": "TT",
        "codeThree": "TTO",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Tristan da Cunha",
        "capital": "Edinburgh of the Seven Seas",
        "capitalLatLong": {
            "latitude": -37.068042,
            "longitude": -12.311315
        },
        "centroidLatLong": {
            "latitude": -24.143474,
            "longitude": -10.030696
        },
        "code": "SH",
        "codeThree": "SHN",
        "continent": "Atlantic Ocean",
        "flagIsParent": false,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Tunisia",
        "capital": "Tunis",
        "capitalLatLong": {
            "latitude": 36.806495,
            "longitude": 10.181532
        },
        "centroidLatLong": {
            "latitude": 33.886917,
            "longitude": 9.537499
        },
        "code": "TN",
        "codeThree": "TUN",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Turkey",
        "capital": "Ankara",
        "capitalLatLong": {
            "latitude": 39.933364,
            "longitude": 32.859742
        },
        "centroidLatLong": {
            "latitude": 38.963745,
            "longitude": 35.243322
        },
        "code": "TR",
        "codeThree": "TUR",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Turkmenistan",
        "capital": "Ashgabat",
        "capitalLatLong": {
            "latitude": 37.960077,
            "longitude": 58.326063
        },
        "centroidLatLong": {
            "latitude": 38.969719,
            "longitude": 59.556278
        },
        "code": "TM",
        "codeThree": "TKM",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Turks and Caicos Islands",
        "capital": "Cockburn Town",
        "capitalLatLong": {
            "latitude": 21.467458,
            "longitude": -71.13891
        },
        "centroidLatLong": {
            "latitude": 21.694025,
            "longitude": -71.797928
        },
        "code": "TC",
        "codeThree": "TCA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Tuvalu",
        "capital": "Funafuti",
        "capitalLatLong": {
            "latitude": -8.520066,
            "longitude": 179.198128
        },
        "centroidLatLong": {
            "latitude": -7.109535,
            "longitude": 177.64933
        },
        "code": "TV",
        "codeThree": "TUV",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "U.S. Virgin Islands",
        "capital": "Charlotte Amalie",
        "capitalLatLong": {
            "latitude": 18.3419,
            "longitude": -64.930701
        },
        "centroidLatLong": {
            "latitude": 18.335765,
            "longitude": -64.896335
        },
        "code": "VI",
        "codeThree": "VIR",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Uganda",
        "capital": "Kampala",
        "capitalLatLong": {
            "latitude": 0.347596,
            "longitude": 32.58252
        },
        "centroidLatLong": {
            "latitude": 1.373333,
            "longitude": 32.290275
        },
        "code": "UG",
        "codeThree": "UGA",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Ukraine",
        "capital": "Kyiv",
        "capitalLatLong": {
            "latitude": 50.4501,
            "longitude": 30.5234
        },
        "centroidLatLong": {
            "latitude": 48.379433,
            "longitude": 31.16558
        },
        "code": "UA",
        "codeThree": "UKR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "United Arab Emirates",
        "capital": "Abu Dhabi",
        "capitalLatLong": {
            "latitude": 24.299174,
            "longitude": 54.697277
        },
        "centroidLatLong": {
            "latitude": 23.424076,
            "longitude": 53.847818
        },
        "code": "AE",
        "codeThree": "ARE",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "United Kingdom",
        "capital": "London",
        "capitalLatLong": {
            "latitude": 51.507351,
            "longitude": -0.127758
        },
        "centroidLatLong": {
            "latitude": 55.378051,
            "longitude": -3.435973
        },
        "code": "GB",
        "codeThree": "GBR",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "United States",
        "capital": "Washington",
        "capitalLatLong": {
            "latitude": 38.907192,
            "longitude": -77.036871
        },
        "centroidLatLong": {
            "latitude": 37.09024,
            "longitude": -95.712891
        },
        "code": "US",
        "codeThree": "USA",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Uruguay",
        "capital": "Montevideo",
        "capitalLatLong": {
            "latitude": -34.901113,
            "longitude": -56.164531
        },
        "centroidLatLong": {
            "latitude": -32.522779,
            "longitude": -55.765835
        },
        "code": "UY",
        "codeThree": "URY",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Uzbekistan",
        "capital": "Tashkent",
        "capitalLatLong": {
            "latitude": 41.299496,
            "longitude": 69.240073
        },
        "centroidLatLong": {
            "latitude": 41.377491,
            "longitude": 64.585262
        },
        "code": "UZ",
        "codeThree": "UZB",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Vanuatu",
        "capital": "Port Vila",
        "capitalLatLong": {
            "latitude": -17.733251,
            "longitude": 168.327325
        },
        "centroidLatLong": {
            "latitude": -15.376706,
            "longitude": 166.959158
        },
        "code": "VU",
        "codeThree": "VUT",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Vatican City",
        "capital": "Vatican City",
        "capitalLatLong": {
            "latitude": 41.902179,
            "longitude": 12.453601
        },
        "centroidLatLong": {
            "latitude": 41.902916,
            "longitude": 12.453389
        },
        "code": "VA",
        "codeThree": "VAT",
        "continent": "Europe",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Venezuela",
        "capital": "Caracas",
        "capitalLatLong": {
            "latitude": 10.480594,
            "longitude": -66.903606
        },
        "centroidLatLong": {
            "latitude": 6.42375,
            "longitude": -66.58973
        },
        "code": "VE",
        "codeThree": "VEN",
        "continent": "Americas",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Vietnam",
        "capital": "Hanoi",
        "capitalLatLong": {
            "latitude": 21.027764,
            "longitude": 105.83416
        },
        "centroidLatLong": {
            "latitude": 14.058324,
            "longitude": 108.277199
        },
        "code": "VN",
        "codeThree": "VNM",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Wallis and Futuna",
        "capital": "Mata-Utu",
        "capitalLatLong": {
            "latitude": -13.282509,
            "longitude": -176.176447
        },
        "centroidLatLong": {
            "latitude": -13.768752,
            "longitude": -177.156097
        },
        "code": "WF",
        "codeThree": "WLF",
        "continent": "Oceania",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": false
    },
    {
        "name": "Western Sahara",
        "capital": "El Aaiún",
        "capitalLatLong": {
            "latitude": 27.125287,
            "longitude": -13.1625
        },
        "centroidLatLong": {
            "latitude": 24.215527,
            "longitude": -12.885834
        },
        "code": "EH",
        "codeThree": "ESH",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Yemen",
        "capital": "Sana'a",
        "capitalLatLong": {
            "latitude": 15.369445,
            "longitude": 44.191007
        },
        "centroidLatLong": {
            "latitude": 15.552727,
            "longitude": 48.516388
        },
        "code": "YE",
        "codeThree": "YEM",
        "continent": "Asia",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Zambia",
        "capital": "Lusaka",
        "capitalLatLong": {
            "latitude": -15.387526,
            "longitude": 28.322817
        },
        "centroidLatLong": {
            "latitude": -13.133897,
            "longitude": 27.849332
        },
        "code": "ZM",
        "codeThree": "ZMB",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    },
    {
        "name": "Zimbabwe",
        "capital": "Harare",
        "capitalLatLong": {
            "latitude": -17.825166,
            "longitude": 31.03351
        },
        "centroidLatLong": {
            "latitude": -19.015438,
            "longitude": 29.154857
        },
        "code": "ZW",
        "codeThree": "ZWE",
        "continent": "Africa",
        "flagIsParent": true,
        "hasBoundary2D": true,
        "hasBoundary3D": true
    }
]

// object containing calulcated duplicated based on the file md5s
// [
//     {
//         "hash": "F1E7B50906B03F82C34AC722C6698051",
//         "list": [
//             "FR",
//             "GF",
//             "MQ"
//         ]
//     },
//     {
//         "hash": "D5A2DF80535375E63497DADC960279CB",
//         "list": [
//             "AU",
//             "HM"
//         ]
//     },
//     {
//         "hash": "FF24417D1915F33E8952057F05CB6F59",
//         "list": [
//             "GP",
//             "MF",
//             "PM",
//             "RE",
//             "YT"
//         ]
//     },
//     {
//         "hash": "FCEDF469EB086B6E1A75371C17324069",
//         "list": [
//             "BQ",
//             "NL"
//         ]
//     },
//     {
//         "hash": "303C0165B3DEEF65E39D88871244B7FB",
//         "list": [
//             "BV",
//             "NO",
//             "SJ"
//         ]
//     },
//     {
//         "hash": "8B33222A8BE7109C1A66A0A4441AE78F",
//         "list": [
//             "GB",
//             "SH"
//         ]
//     },
//     {
//         "hash": "4DBBBE1F93DAE14EA87AD215CF72E356",
//         "list": [
//             "UM",
//             "US"
//         ]
//     }
// ]