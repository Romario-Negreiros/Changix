import React from 'react'

import CustomDatalistInput from 'react-datalist-input'

import styles from '@styles/DatalistInput.module.css'

const DatalistInput: React.FC = () => {
  return (
    <div className={styles.container}>
      <CustomDatalistInput
        className={styles.datalist_input}
        label="Search for a item name"
        showLabel={false}
        placeholder="Search for a item name"
        items={[
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' },
          { id: 'one', value: 'one' }
        ]}
      />
    </div>
  )
}

export default DatalistInput
