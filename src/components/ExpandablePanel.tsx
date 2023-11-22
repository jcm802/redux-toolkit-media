import { useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

interface IExpandablePanel {
    header: JSX.Element;
    children: JSX.Element;
}

export default function ExpandablePanel({ header, children }: IExpandablePanel) {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
    <div className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center'>
            <div className='flex flex-row items-center justify-between'>
                {header}
            </div>
            <div className='cursor-pointer' onClick={() => setExpanded(!expanded)}>
                {expanded ?  <GoChevronUp /> : <GoChevronDown />}
            </div>
        </div>
        {expanded ? (
            <div className='p-2 border-t'>
                {children}
            </div>
        ) : null}
    </div>
  )
}
