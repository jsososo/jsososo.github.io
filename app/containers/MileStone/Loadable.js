/**
 *
 * Asynchronously loads the component for MileStone
 *
 */

import Loadable from 'react-loadable';
import ModuleLoading from '../../components/ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: ModuleLoading,
});
