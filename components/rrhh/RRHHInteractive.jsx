'use client';

import React, { useState } from 'react';
import TabSwitcher from './TabSwitcher';
import Stepper from './Stepper';
import CVUpload from './CVUpload';
import ManualFormWizard from './manual/ManualFormWizard';

export default function RRHHInteractive() {
  const [active, setActive] = useState('upload'); // 'upload' | 'manual'

  return (
    <section>
      <TabSwitcher active={active} onChange={setActive} />
      <Stepper step={active === 'upload' ? 1 : 1} />
      {active === 'upload' ? <CVUpload /> : <ManualFormWizard />}
    </section>
  );
}
