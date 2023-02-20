import * as React from 'react';
import { NavLink } from 'react-router-dom';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, colors } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import { ROUTES } from '../../../routes';
import { metrics } from '../../../styles/theme';

const Navbar = React.memo(() => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = React.useMemo(
    () => [
      {
        label: 'Currency list',
        to: ROUTES.ExchangeListPage,
        icon: <CreditCardIcon />,
      },
      {
        label: 'Convert',
        to: ROUTES.ConvertPage,
        icon: <CurrencyExchangeIcon />,
      },
    ],
    [],
  );

  return (
    <AppBar position="static">
      <Wrapper>
        <CustomToolbar>
          <DesktopWrapper>
            <LogoIcon />
            <LogoTitle>Currency converter</LogoTitle>
            <MenuWrapper>
              {pages.map(({ to, label, icon }) => (
                <NavLinkWrapper key={to} to={to}>
                  <Button startIcon={icon}>{label}</Button>
                </NavLinkWrapper>
              ))}
            </MenuWrapper>
          </DesktopWrapper>

          <MobileWrapper>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map(({ to, label, icon }) => (
                <MenuItem key={to} onClick={handleCloseNavMenu}>
                  <MobileNavLinkWrapper key={to} to={to}>
                    <Button startIcon={icon}>{label}</Button>
                  </MobileNavLinkWrapper>
                </MenuItem>
              ))}
            </Menu>
            <LogoIcon />
            <LogoTitle>Currency converter</LogoTitle>
            <MenuButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MenuButton>
          </MobileWrapper>
        </CustomToolbar>
      </Wrapper>
    </AppBar>
  );
});

const Wrapper = styled.div`
  max-width: ${metrics.pageSize.maxWidth}px;
  margin: 0 auto;
  width: 100%;
  display: flex;
`;

const CustomToolbar = styled(Toolbar)`
  width: 100%;
`;

const DesktopWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  ${down('md')} {
    display: none;
  }
`;

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const LogoTitle = styled(Typography)`
  margin-right: ${metrics.margin.doubleBase}px;
  font-weight: 500;
  text-transform: uppercase;
`;

const LogoIcon = styled(CurrencyExchangeIcon)`
  margin-right: ${metrics.margin.base}px;
`;

const NavLinkWrapper = styled(NavLink)`
  &:not(.active):hover {
    opacity: 0.7;
  }

  & .MuiButton-root {
    color: #fff;
  }

  &.active .MuiButton-root {
    color: ${colors.blue[300]};
  }
`;

const MobileNavLinkWrapper = styled(NavLinkWrapper)`
  & .MuiButton-root {
    color: ${colors.blue[700]};

    &:hover {
      background-color: inherit;
    }
  }
`;

const MobileWrapper = styled(DesktopWrapper)`
  display: none;

  ${down('md')} {
    display: flex;
  }
`;

const MenuButton = styled(IconButton)`
  margin-left: auto;
`;

export default Navbar;
