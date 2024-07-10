import React, { useState } from 'react'
import CalendarStep from './CalendarStep'
import ConfirmStep from './ConfirmStep'

// import { Container } from './styles';

const ScheduleForm: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}

export default ScheduleForm
