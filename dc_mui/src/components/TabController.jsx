import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';

// Composant pour le panneau des onglets
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const TabController = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      
        <Tabs value={value} onChange={handleChange} aria-label="tabs example">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
     
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Typography variant="h6">{tab.content}</Typography>
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabController;
