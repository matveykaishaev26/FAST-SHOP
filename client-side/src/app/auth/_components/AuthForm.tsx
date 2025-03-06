import { PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/components/ui/card";
import Link from "next/link";
import { ContinueWith } from "./ContinueWith";
import { Button } from "@/shared/components/ui/button";
type Props = {
  header: string;
  description?: string;
  isContinueIncluded?: boolean;
  btnLinkText?: string;
  btnLinkHref?: string;
};
export function AuthForm({
  header,
  description,
  children,
  btnLinkText,
  btnLinkHref,
  isContinueIncluded,
}: PropsWithChildren<Props>) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{header}</CardTitle>
        {description ? <CardDescription className="text-center">{description}</CardDescription> : ""}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-4">
        {isContinueIncluded && <ContinueWith />}
        {btnLinkHref && btnLinkText && (
          <Link className={"text-center"} href={btnLinkHref}>
            <Button variant={"link"}>{btnLinkText}</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
