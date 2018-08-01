/**
 *
 * Asynchronously loads the component for PiggyLog
 *
 */

import Loadable from 'react-loadable';
import ModuleLoading from '../ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: ModuleLoading,
});
