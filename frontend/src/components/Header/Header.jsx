import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/ThemeContext";
import EditProfileModal from "../EditProfilModal/EditProfileModal";

export const Header = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.auth);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());

  // Debug: Log user changes
  useEffect(() => {
    console.log('Header: User object changed:', user);
  }, [user]);

  // Force re-render when user avatar changes
  useEffect(() => {
    if (user?.avatar) {
      console.log('Header: User avatar changed to:', user.avatar);
      setAvatarKey(Date.now());
    }
  }, [user?.avatar]);

  return (
    <HeaderWrapper>
      <HeaderContent>Task Pro</HeaderContent>
      <RightSection>
        <ThemeSelector>
          <ThemeButton
            $active={currentTheme === "light"}
            onClick={() => setTheme("light")}
          >
            Light
          </ThemeButton>
          <ThemeButton
            $active={currentTheme === "violet"}
            onClick={() => setTheme("violet")}
          >
            Violet
          </ThemeButton>
          <ThemeButton 
            $active={currentTheme === "dark"} 
            onClick={() => setTheme("dark")}
          >
            Dark
          </ThemeButton>
        </ThemeSelector>

        <UserInfoButton onClick={() => setIsProfileModalOpen(true)}>
          <UserName>{user?.name || 'User'}</UserName>
          <UserAvatar 
            key={avatarKey}
            src={user?.avatar ? `${user.avatar}?t=${avatarKey}` : 'https://via.placeholder.com/32'} 
            alt={user?.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32';
            }}
          />
        </UserInfoButton>
      </RightSection>

      {isProfileModalOpen && (
        <EditProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: ${(p) => p.theme.colors.headerBgColor || p.theme.colors.themeWrapper};
  border-bottom: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
`;

const HeaderContent = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.themeMainTextColor};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ThemeButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  border-radius: 8px;
  background-color: ${(p) =>
    p.$active ? p.theme.colors.primaryColor : "transparent"};
  color: ${(p) => (p.$active ? p.theme.colors.whiteColor : p.theme.colors.themeMainTextColor)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(p) => p.theme.colors.primaryColor};
    color: ${(p) => p.theme.colors.whiteColor};
  }
`;

const UserInfoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${(p) => p.theme.colors.modalBorderColorLowOp};
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(p) => p.theme.colors.modalBorderColorLowOp};
  }
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.themeMainTextColor};
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Header;
