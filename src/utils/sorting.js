import moment from 'moment';

const datesAscending = (a, b) => moment.duration(moment(a.startTime)
.diff(moment().startOf('day'))) > moment.duration(moment(b.startTime).diff(moment().startOf('day'))) ? 1 : -1
  
  export {datesAscending}