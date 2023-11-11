import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import { createUseStyles } from 'react-jss';
import Section from './Section';

interface SectionChapterProps {
  background?: string;
  titleId: string;
  leadTextId: string;
  tableContent?: Array<{ headerId: string; paragraphsId: string[] }>;
}

const useStyles = createUseStyles({
  title: {textTransform: 'uppercase', textAlign: 'center', fontSize: '1.5em', fontWeight: 600, color: '#555' },
  leadText: { textAlign: 'center', fontSize: '2.6em', fontWeight: 400 },
  table: {},
  tableHeader: {},
  tableParagraph: {},
});


const SectionChapter: React.FC<SectionChapterProps> = ({ background, titleId, leadTextId, tableContent }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Section background={background} padding='large'>
      <h5 className={classes.title}>{intl.formatMessage({ id: titleId })}</h5>
      <p className={classes.leadText}>{intl.formatMessage({ id: leadTextId })}</p>
      <table className={classes.table}>
        {tableContent && tableContent.map((content, index) => (
          <tr key={index}>
            <th className={classes.tableHeader}>
              {intl.formatMessage({ id: content.headerId })}
            </th>
            <td>
              {content.paragraphsId.map((paragraphId, pIndex) => (
                <p key={pIndex} className={classes.tableParagraph}>
                  {intl.formatMessage({ id: paragraphId })}
                </p>
              ))}
            </td>
          </tr>
        ))}
      </table>
    </Section>
  );
};

export default SectionChapter
