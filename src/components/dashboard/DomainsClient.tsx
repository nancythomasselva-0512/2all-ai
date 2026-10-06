"use client";

import { useRouter } from "next/navigation";
import DomainOnboarding, { UserAccountInfo } from "@/components/dashboard/DomainOnboarding";

interface DomainsClientProps {
  initialDomains: any[];
  userName: string;
  accountInfo?: UserAccountInfo;
}

export default function DomainsClient({ initialDomains, userName, accountInfo }: DomainsClientProps) {
  const router = useRouter();

  const handleDomainClick = (domain: any) => {
    router.push(`/dashboard/domains/${domain.id}`);
  };

  return (
    <DomainOnboarding
      initialDomains={initialDomains}
      userName={userName}
      accountInfo={accountInfo}
      onDomainClick={handleDomainClick}
    />
  );
}
