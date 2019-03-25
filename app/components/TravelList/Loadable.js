/**
 *
 * Asynchronously loads the component for TravelList
 *
 */

import Loadable from 'react-loadable';
import Loading from '../ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
