import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Link } from "expo-router";
import { Text, View } from "@/components/Themed";
import BackButton from "@/components/pressable/BackButton2";

const PrivacyPolicy = () => {
  return (
    <Container>
      <BackButton variant="dark" />
      <Text variant="title">מדיניות פרטיות</Text>
      {/* <Link href="../">
        <Text>Close</Text>
      </Link> */}
      <ScrollView style={{ margin: 10 }}>
        <Text>עודכן לאחרונה: 04/09/2024</Text>

        <Text>
          אנו באפליקציית החדשות ("Briefly") מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שלכם. מדיניות פרטיות זו
          מסבירה כיצד אנו אוספים, משתמשים, שומרים וחושפים את המידע האישי שלכם כאשר אתם משתמשים באפליקציה.
        </Text>

        <Text variant="subheading">1. מידע שאנו אוספים</Text>
        <Text>
          אנו אוספים מידע אישי ממשתמשי האפליקציה על מנת לספק חווית משתמש מותאמת אישית ולשפר את השירותים שלנו. סוגי המידע
          שאנו עשויים לאסוף כוללים:
        </Text>
        <Text>
          - כתובת אימייל: אנו משתמשים בכתובת האימייל שלכם לצורך שמירה על מידע הקשור לחשבונכם, לצורך שליחת עדכונים,
          הודעות חשובות, והתראות הקשורות לאפליקציה.
        </Text>

        <Text variant="subheading">2. שימוש במידע</Text>
        <Text>המידע שאנו אוספים משמש למטרות הבאות:</Text>
        <Text>- לאפשר את השימוש באפליקציה ולספק את השירותים המבוקשים.</Text>
        <Text>- לשלוח עדכונים והודעות בנוגע לאפליקציה, כגון חדשות, תכנים מותאמים אישית והתראות.</Text>
        <Text>- לשפר את השירותים והתכנים המוצעים באפליקציה.</Text>

        <Text variant="subheading">3. שיתוף מידע</Text>
        <Text>אנו לא נשתף את המידע האישי שלכם עם צדדים שלישיים, למעט במקרים הבאים:</Text>
        <Text>- כאשר נידרש לעשות זאת על פי חוק או צו בית משפט.</Text>
        <Text>- כאשר הדבר נחוץ כדי להגן על הזכויות, הרכוש או הביטחון של האפליקציה, המשתמשים שלנו או הציבור.</Text>

        <Text variant="subheading">4. אבטחת מידע</Text>
        <Text>
          אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שינוי, גילוי או השמדה. עם
          זאת, אין מערכת אבטחה מושלמת ולכן איננו יכולים להבטיח שהמידע שלכם יהיה בטוח באופן מוחלט.
        </Text>

        <Text variant="subheading">5. זכויות המשתמשים</Text>
        <Text>
          למשתמשים יש את הזכות לגשת למידע האישי שלהם, לעדכן אותו או למחוק אותו בכל עת. אם ברצונכם לממש זכויות אלו, אנא
          צרו קשר באמצעות פרטי הקשר המפורטים להלן.
        </Text>

        <Text variant="subheading">6. שינויים במדיניות הפרטיות</Text>
        <Text>
          אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. כל שינוי במדיניות ייכנס לתוקף מיד עם פרסומו באפליקציה. אנו ממליצים
          למשתמשים לבדוק מדיניות זו באופן קבוע כדי להתעדכן בשינויים.
        </Text>

        <Text variant="subheading">7. יצירת קשר</Text>
        <Text>לשאלות או הערות בנוגע למדיניות פרטיות זו, אנא צרו קשר בכתובת האימייל: brieflyteam@gmail.com.</Text>

        <Text>בהשתמשכם באפליקציה, אתם מאשרים את הסכמתכם לתנאי מדיניות פרטיות זו.</Text>
      </ScrollView>
    </Container>
  );
};

export default PrivacyPolicy;
