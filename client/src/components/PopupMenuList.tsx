import React, { useState, FC, PropsWithChildren } from 'react';
import {
  Popper,
  MenuItem,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  ButtonBase,
  Tooltip,
} from '@material-ui/core';

export type PopupMenuItemProps = {
  name: string;
  onClick: () => void;
};

interface PopupMenuListProps {
  title: string;
  menuItems: PopupMenuItemProps[];
}
const PopupMenuList: FC<PropsWithChildren<PopupMenuListProps>> = ({ children, title, menuItems }) => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title={title}>
        <ButtonBase ref={anchorRef} disableRipple onClick={handleToggle}>
          {children}
        </ButtonBase>
      </Tooltip>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {menuItems.map((menuItem) => (
                    <MenuItem
                      key={menuItem.name}
                      onClick={() => {
                        menuItem.onClick();
                        handleToggle();
                      }}
                    >
                      {menuItem.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PopupMenuList;
