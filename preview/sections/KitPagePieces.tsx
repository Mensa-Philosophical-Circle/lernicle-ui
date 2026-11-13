import { useState } from 'react';

import { PREVIEW_OPTIONS } from '../previewData';
import { FormField, SearchableSelect } from '../../src/fields';
import { BankLockPanel, ExportButton, FiguresRow, FilterPopover, ListSkeleton, ListToolbar, MoneyTotals, NoMatches, PageError, PageNote, Pager, StatePanel, StatusPill, UnderlineTabs, ViewOnlyNote, primaryLinkClass } from '../../src';

const wait = () => new Promise((resolve) => setTimeout(resolve, 2500));

export function KitPagePieces() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');
  const [page, setPage] = useState(2);
  const [tab, setTab] = useState('overview');

  return (
    <div className="flex flex-col gap-4">
      <UnderlineTabs
        label="Sections"
        tabs={[
          { value: 'overview', label: 'Overview' },
          { value: 'transactions', label: 'Transactions' },
          { value: 'breakdown', label: 'Breakdown' },
          { value: 'reports', label: 'A much longer tab name' },
        ]}
        value={tab}
        onChange={setTab}
      />
      <FiguresRow
        figures={[
          { label: 'Paid', lines: ['GHS 12,400.00', 'KES 3,000,000.00'], sub: '42 people' },
          { label: 'Owed', lines: ['GHS 900.00'], action: { label: 'View', onClick: () => {} } },
          { label: 'Failed', lines: [], emptyText: 'None in this view' },
          { label: 'Pupils', lines: ['1,204'], plain: 'On roll this term' },
        ]}
        label="Totals"
        note="Covers everything matching your filters."
      />
      <ListToolbar label="Search" value={search} onChange={setSearch}>
        <FilterPopover count={dept ? 1 : 0} matchText="42 match" onClear={() => setDept('')}>
          <FormField label="Department">
            <SearchableSelect options={PREVIEW_OPTIONS} value={dept} onChange={setDept} />
          </FormField>
        </FilterPopover>
        <ExportButton onExport={wait} />
      </ListToolbar>
      <div className="flex flex-wrap gap-2">
        <StatusPill label="Paid" tone="good" />
        <StatusPill label="Pending" tone="warning" />
        <StatusPill label="Failed" tone="bad" />
        <StatusPill label="Draft" tone="brand" />
        <StatusPill label="Cancelled" />
      </div>
      <MoneyTotals
        className="font-semibold"
        totals={[
          { currency: 'GHS', total: 500 },
          { currency: 'KES', total: 1200 },
        ]}
      />
      <NoMatches text="No payroll matches. Try another search or filter." onClear={() => {}} />
      <Pager page={page} pageSize={20} setPage={setPage} total={95} totalPages={5} />
      <ViewOnlyNote reason="permission" />
      <PageNote action={{ label: 'Show failed payments', onClick: () => {} }} tone="danger">
        3 payments failed.
      </PageNote>
      <PageNote tone="warning">Your plan ends soon.</PageNote>
      <StatePanel
        actions={<a className={primaryLinkClass} href="#staff">Add staff</a>}
        body="Add your staff first. You can then set up their pay here."
        title="No staff yet"
      />
      <PageError title="We could not load this pay history" onRetry={() => {}} />
      <BankLockPanel connectHref="#bank" reason="Connect your school’s bank account to start processing payroll." />
      <BankLockPanel connectHref="#bank" reason="" onRetry={() => {}} />
      <ListSkeleton rows={3} />
    </div>
  );
}
