import HomeIcon from '../../../../assets/images/Icons/tabBar/home.svg';
import HomeIconActivated from '../../../../assets/images/Icons/tabBar/home-activated.svg';

import HistoryIcon from '../../../../assets/images/Icons/tabBar/history.svg';
import HistoryIconActivated from '../../../../assets/images/Icons/tabBar/history-activated.svg';

import NotificationsIcon from '../../../../assets/images/Icons/tabBar/bell.svg';
import NotificationsIconActivated from '../../../../assets/images/Icons/tabBar/bell-activated.svg';

import SocialIcon from '../../../../assets/images/Icons/tabBar/social.svg';
import SocialIconActivated from '../../../../assets/images/Icons/tabBar/social-activated.svg';
import { SvgProps } from 'react-native-svg';

export interface ISwitchRouteIconReturn {
  activatedIcon: React.FC<SvgProps>;
  deactivatedIcon: React.FC<SvgProps>;
}

export function switchRouteIcon(RouteName: string): ISwitchRouteIconReturn {
  const icons = {
    activatedIcon: HomeIconActivated,
    deactivatedIcon: HomeIcon
  }

  switch (RouteName) {
    case 'Home':
      return icons;

    case 'Histórico':
      icons.activatedIcon = HistoryIconActivated;
      icons.deactivatedIcon = HistoryIcon;
      return icons;

    case 'Notificação':
      icons.activatedIcon = NotificationsIconActivated;
      icons.deactivatedIcon = NotificationsIcon;
      return icons;

    case 'Social':
      icons.activatedIcon = SocialIconActivated;
      icons.deactivatedIcon = SocialIcon;

      return icons;
    default:
      return icons;
  }
}