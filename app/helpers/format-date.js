import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  return moment(params).fromNow();
}

export default Ember.Helper.helper(formatDate);
