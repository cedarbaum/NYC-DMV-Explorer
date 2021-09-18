export module MockResponseData {
  export function getDates(branchId: string, serviceId: string) {
    return [
      { date: '2021-06-16' },
      { date: '2021-06-17' },
      { date: '2021-06-18' },
      { date: '2021-06-21' },
      { date: '2021-06-22' },
      { date: '2021-06-23' },
      { date: '2021-06-24' },
      { date: '2021-06-25' },
      { date: '2021-06-28' },
      { date: '2021-06-29' },
      { date: '2021-06-30' },
      { date: '2021-07-01' },
      { date: '2021-07-02' },
      { date: '2021-07-06' },
      { date: '2021-07-07' },
      { date: '2021-07-08' },
      { date: '2021-07-09' },
      { date: '2021-07-12' },
      { date: '2021-07-13' },
      { date: '2021-07-14' },
      { date: '2021-07-15' },
      { date: '2021-07-16' },
      { date: '2021-07-19' },
      { date: '2021-07-20' },
      { date: '2021-07-21' },
      { date: '2021-07-22' },
      { date: '2021-07-23' },
      { date: '2021-07-26' },
      { date: '2021-07-27' },
      { date: '2021-07-28' },
    ];
  }

  export function getTimesForDate(
    branchId: string,
    serviceId: string,
    date: string
  ): any {
    console.log(date);
    switch (date) {
      case '2021-06-16':
        return [
          { date: '2021-06-16', time: '09:00' },
          { date: '2021-06-16', time: '12:00' },
          { date: '2021-06-16', time: '13:00' },
          { date: '2021-06-16', time: '14:00' },
          { date: '2021-06-16', time: '15:00' },
          { date: '2021-06-16', time: '16:00' },
          { date: '2021-06-16', time: '17:00' },
        ];
      default:
        return [];
    }
  }
}
