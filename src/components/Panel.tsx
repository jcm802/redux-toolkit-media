import classNames from 'classnames';

interface IPanelProps {
  children: JSX.Element;
  className: string;
}

function Panel({ children, className, ...rest }: IPanelProps) {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
