import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    classname?: string;
    href?: string;
    item?: string;
    onClick?: () => void

}

export default function ThemeColorButton({ classname, href, item, onClick }: Props) {
    return (
            <Button
                onClick={() => onClick && onClick()}
                style={{ backgroundColor: `${item}` }}
                className={cn(
                    `p-2  w-3 h-3 rounded-full hover:bg-[${item}]`, classname
                )}
            ></Button>
    )
}

