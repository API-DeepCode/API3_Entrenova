interface Props {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: Props) {
    const progress = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}