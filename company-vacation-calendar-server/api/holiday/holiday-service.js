const axios = require("axios");

async function getAllHolidays() {
  try {
    const {
      data: {
        response: { holidays: holidaysRes },
      },
    } = await axios.get(
      `https://calendarific.com/api/v2/holidays?&api_key=${
        process.env.HOLIDAY_API_KEY
      }&country=BG&year=${new Date().getFullYear()}&type=national`
    );
    const holidays = holidaysRes.map((h) => new Date(h.date.iso).getTime());

    return {
      holidays,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllHolidays,
};
