<?php

namespace CodeMina;

class Helper
{

    /**
     * @return array
     */
    public static function getCountries()
    {
        $countries = array(
            "Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bhutan",
            "Bolivia",
            "Bosnia and Herzegovina",
            "Botswana",
            "Brazil",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cape Verde",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Colombi",
            "Comoros",
            "Congo (Brazzaville)",
            "Congo",
            "Costa Rica",
            "Cote d'Ivoire",
            "Croatia",
            "Cuba",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "East Timor (Timor Timur)",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Ethiopia",
            "Fiji",
            "Finland",
            "France",
            "Gabon",
            "Gambia, The",
            "Georgia",
            "Germany",
            "Ghana",
            "Greece",
            "Grenada",
            "Guatemala",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Honduras",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Korea, North",
            "Korea, South",
            "Kuwait",
            "Kyrgyzstan",
            "Laos",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macedonia",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Mauritania",
            "Mauritius",
            "Mexico",
            "Micronesia",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Qatar",
            "Romania",
            "Russia",
            "Rwanda",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Vincent",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia and Montenegro",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "Spain",
            "Sri Lanka",
            "Sudan",
            "Suriname",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Togo",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "United States",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Vatican City",
            "Venezuela",
            "Vietnam",
            "Yemen",
            "Zambia",
            "Zimbabwe"
        );

        return array_combine($countries, $countries);
    }

    /**
     * @param array $array
     * @param bool $innerOperator
     * @return string
     */
    public static function bind(array $array, bool $innerOperator = false)
    {
        $result = [];
        foreach ($array as $key => $value) {
            $operator = !$innerOperator ? '=' : '';
            if (is_numeric($value)) {
                $result[] = $key . $operator . $value;
            } else {
                $result[] = $key . $operator . "'" . $value . "'";
            }
        }

        return implode(' AND ', $result);
    }

    /**
     * @param int $length
     * @param string $str
     * @return string
     */
    public static function random($length = 16, $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    {
        $Random = "";
        $characters = $str;
        while ($length > 0) {
            $Random .= $characters[mt_rand(0, strlen($characters) - 1)];
            $length -= 1;
        }

        return $Random;
    }

    /**
     * @param string $html
     * @param bool $tags
     * @param int $length
     * @return string
     */
    public static function sub(string $html, bool $tags = false, int $length = 20)
    {
        if (!$tags) $html = strip_tags($html);
        if (mb_strlen(strip_tags($html)) > $length) {
            return mb_substr($html, 0, $length) . '...';
        }

        return $html;
    }

    /**
     * @param $amount
     * @param string $currency
     * @return string
     */
    public static function number_format($amount, $currency = AUTH_CURRENCY)
    {
        return $currency . ' ' . number_format($amount, defined('AUTH_DECIMAL') ? AUTH_DECIMAL : 2);
    }

    /**
     * @param $date
     * @param string $format
     * @return false|string
     */
    public static function date_format($date, $format = 'Y-m-d')
    {
        return !is_null($date) ? date($format, strtotime($date)) : '--';
    }
}
