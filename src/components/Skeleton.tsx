import classNames from "classnames"

interface SkeletonProps {
    times: number,
    className?: string,
}

export default function Skeleton({ times, className }: SkeletonProps) {
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        'bg-gray-200',
        'rounded',
        'mb-2.5',
        className
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );
    // Fancy for loop - creates an array of jsx
    const boxes = Array(times).fill(0).map((_, i) => {
        return <div key={i} className={outerClassNames}>
            <div className={innerClassNames} />
        </div>
    })
    return <>{boxes}</>;
}