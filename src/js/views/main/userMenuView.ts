import { userMenuTemplate } from '../../templates/main/userMenuTemplate';
import { $, emit } from '../../utils/common';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';
import { CONFIRM_MESSAGE } from '../../constants/confirmConstants';
import Storage from '../../api/storage';

export default class UserMenuView {
  private $app: HTMLElement;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
  }

  showMenu() {
    this.$app.insertAdjacentHTML('beforeend', userMenuTemplate);

    $(SELECTOR.ID.MENU_EDIT_PROFILE).addEventListener(
      'click',
      this.handleEditProfileClick.bind(this)
    );
    $(SELECTOR.ID.MENU_SIGN_OUT).addEventListener('click', this.handleSignOutClick.bind(this));
  }

  hideMenu() {
    $(SELECTOR.ID.USER_MENU).remove();
  }

  private handleEditProfileClick(event: { target: HTMLButtonElement }) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.SIGN } });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }

  private handleSignOutClick() {
    if (!window.confirm(CONFIRM_MESSAGE.SIGN_OUT)) return;

    Storage.deleteUserData();

    emit({
      eventName: CUSTOM_EVENT.ROUTE_CHANGE,
      detail: { url: URL.PURCHASE_ITEM, page: URL.MAIN },
    });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }
}
