/**
 *
 * Asynchronously loads the component for NoticeSetting
 *
 */

import Loadable from 'react-loadable';
import ModuleLoading from '../ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: ModuleLoading,
});
