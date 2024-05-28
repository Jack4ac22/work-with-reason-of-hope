import { synchronizaAllData } from "@/util/actions/translation-app-actions/sync";
import SyncForm from "@/components/translation-app-components/forms/sync-form/sync-form";

export default function SyncPage() {
  return <SyncForm action={synchronizaAllData} />;
}