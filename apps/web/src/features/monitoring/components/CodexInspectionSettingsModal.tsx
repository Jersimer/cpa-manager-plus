import type { TFunction } from 'i18next';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  IconBot,
  IconCrosshair,
  IconSettings,
  IconTimer,
} from '@/components/ui/icons';
import {
  DEFAULT_CODEX_INSPECTION_SETTINGS,
  type CodexInspectionAutoActionMode,
} from '@/features/monitoring/codexInspection';
import { CodexInspectionAutoActionEditor } from '@/features/monitoring/components/CodexInspectionAutoActionEditor';
import { SettingsSection } from '@/features/monitoring/components/CodexInspectionPanels';
import {
  type InspectionSettingsDraft,
  type InspectionSettingsDraftField,
} from '@/features/monitoring/model/codexInspectionPresentation';
import styles from '../CodexInspectionPage.module.scss';

type CodexInspectionSettingsModalProps = {
  open: boolean;
  settingsDraft: InspectionSettingsDraft;
  t: TFunction;
  onClose: () => void;
  onDraftChange: (field: InspectionSettingsDraftField, value: string) => void;
  onAutoActionModeChange: (value: CodexInspectionAutoActionMode) => void;
  onReset: () => void;
  onSave: () => void;
};

export function CodexInspectionSettingsModal({
  open,
  settingsDraft,
  t,
  onClose,
  onDraftChange,
  onAutoActionModeChange,
  onReset,
  onSave,
}: CodexInspectionSettingsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('monitoring.codex_inspection_settings_title')}
      width={1040}
      className={styles.settingsModal}
    >
      <div className={styles.settingsBody}>
        <SettingsSection
          icon={<IconCrosshair size={18} />}
          title={t('monitoring.codex_inspection_settings_group_strategy')}
        >
          <div className={`${styles.settingsGrid} ${styles.settingsGridStrategy}`}>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_target_type_label')}
                value={settingsDraft.targetType}
                onChange={(event) => onDraftChange('targetType', event.target.value)}
                placeholder={DEFAULT_CODEX_INSPECTION_SETTINGS.targetType}
              />
            </div>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_used_percent_threshold_label')}
                hint={t('monitoring.codex_inspection_settings_threshold_hint')}
                type="number"
                value={settingsDraft.usedPercentThreshold}
                onChange={(event) => onDraftChange('usedPercentThreshold', event.target.value)}
                min={0}
                max={100}
                step={0.1}
              />
            </div>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_sample_size_label')}
                hint={t('monitoring.codex_inspection_settings_sample_size_hint')}
                type="number"
                value={settingsDraft.sampleSize}
                onChange={(event) => onDraftChange('sampleSize', event.target.value)}
                min={0}
                step={1}
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={<IconTimer size={18} />}
          title={t('monitoring.codex_inspection_settings_group_concurrency')}
        >
          <div className={`${styles.settingsGrid} ${styles.settingsGridConcurrency}`}>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_workers_label')}
                type="number"
                value={settingsDraft.workers}
                onChange={(event) => onDraftChange('workers', event.target.value)}
                min={1}
                step={1}
              />
            </div>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_delete_workers_label')}
                type="number"
                value={settingsDraft.deleteWorkers}
                onChange={(event) => onDraftChange('deleteWorkers', event.target.value)}
                min={1}
                step={1}
              />
            </div>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_timeout_label')}
                type="number"
                value={settingsDraft.timeout}
                onChange={(event) => onDraftChange('timeout', event.target.value)}
                min={1}
                step={100}
              />
            </div>
            <div className={styles.settingsField}>
              <Input
                label={t('monitoring.codex_inspection_settings_retries_label')}
                type="number"
                value={settingsDraft.retries}
                onChange={(event) => onDraftChange('retries', event.target.value)}
                min={0}
                step={1}
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={<IconBot size={18} />}
          title={t('monitoring.codex_inspection_settings_user_agent_label')}
        >
          <div className={styles.settingsGrid}>
            <div className={`${styles.settingsField} ${styles.settingsFieldWide}`}>
              <Input
                label={t('monitoring.codex_inspection_settings_user_agent_label')}
                value={settingsDraft.userAgent}
                onChange={(event) => onDraftChange('userAgent', event.target.value)}
                placeholder={DEFAULT_CODEX_INSPECTION_SETTINGS.userAgent}
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={<IconSettings size={18} />}
          title={t('monitoring.codex_inspection_settings_group_auto')}
        >
          <CodexInspectionAutoActionEditor
            value={settingsDraft.autoActionMode}
            t={t}
            onChange={onAutoActionModeChange}
          />
        </SettingsSection>
      </div>

      <div className={styles.settingsActionsBar}>
        <Button className={styles.settingsResetButton} variant="secondary" onClick={onReset}>
          {t('monitoring.codex_inspection_settings_reset_button')}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button variant="primary" onClick={onSave}>
          {t('common.save')}
        </Button>
      </div>
    </Modal>
  );
}
