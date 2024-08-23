import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';


const TabController = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  
    const handleTabChange = (tabId) => {
      setActiveTab(tabId);
    };
  
    return (
      <div>
        <CNav variant="tabs">
          {tabs.map((tab) => (
            <CNavItem key={tab.id}>
              <CNavLink
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.title}
              </CNavLink>
            </CNavItem>
          ))}
        </CNav>
  
        <CTabContent>
          {tabs.map((tab) => (
            <CTabPane key={tab.id} visible={activeTab === tab.id}>
              {tab.content}
            </CTabPane>
          ))}
        </CTabContent>
      </div>
    );
  };
  
  TabController.propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired,
      })
    ).isRequired,
  };
  
  export default TabController;