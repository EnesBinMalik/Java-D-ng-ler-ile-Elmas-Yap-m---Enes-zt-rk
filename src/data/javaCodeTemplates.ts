export interface JavaSnippet {
  id: string;
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
  explanation: {
    title: string;
    points: string[];
  };
}

export const JAVA_TEMPLATES: JavaSnippet[] = [
  {
    id: 'diamond-symmetric',
    title: 'Elmas Deseni (Ödev Çözümü - Simetrik Döngü)',
    badge: 'Önerilen & Temiz Çözüm',
    filename: 'ElmasYapimi.java',
    description: 'Enes Öztürk imzalı, üst piramidi i=0\'dan n\'e, alt piramidi i=(n-1)\'den 0\'a kadar simetrik olarak işleten profesyonel Java çözümü.',
    code: `import java.util.Scanner;

/**
 * ====================================================================
 * Proje: Java Döngüler ile Yıldızlardan Elmas Yapımı (Ödev Çözümü)
 * Geliştirici / Yazar: Enes Öztürk
 * Konu: İç İçe Döngüler (Nested Loops), Scanner ve Algoritmik Desen
 * ====================================================================
 */
public class Main {
    public static void main(String[] args) {
        Scanner klavye = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   YILDIZLAR İLE ELMAS YAPIMI PROGRAMI    ");
        System.out.println("         Hazırlayan: Enes Öztürk          ");
        System.out.println("==========================================");

        System.out.print("Bir Sayı Giriniz : ");
        int n = klavye.nextInt();

        // ----------------------------------------------------
        // 1. KISIM: Üst Piramit (Tepe noktasından merkeze kadar)
        // ----------------------------------------------------
        for (int i = 0; i <= n; i++) {
            // Boşlukları basan döngü: Her satırda (n - i) boşluk
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            // Yıldızları basan döngü: Her satırda (2 * i + 1) yıldız
            for (int k = 1; k <= (2 * i + 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // ----------------------------------------------------
        // 2. KISIM: Alt Piramit (Merkezin altından uç noktaya)
        // ----------------------------------------------------
        for (int i = n - 1; i >= 0; i--) {
            // Boşlukları basan döngü: Aşağı indikçe boşluk artar
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            // Yıldızları basan döngü: Aşağı indikçe yıldızlar azalır
            for (int k = 1; k <= (2 * i + 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }

        System.out.println("------------------------------------------");
        System.out.println("Kod Tamamlandı! Hazırlayan: Enes Öztürk");

        klavye.close();
    }
}`,
    explanation: {
      title: 'Algoritma Analizi ve Çalışma Mantığı',
      points: [
        'Üst Piramit: i değişkeni 0\'dan n\'e kadar artar. Her adımda (n - i) adet boşluk ve (2 * i + 1) adet yıldız basılır.',
        'Merkez Satır: i = n olduğunda boşluk (n - n) = 0 olur ve en geniş satır (2 * n + 1) yıldız ile çizilir.',
        'Alt Piramit: i değişkeni (n - 1)\'den başlayıp 0\'a kadar geri sayar. Bu sayede aynı formüller (n - i) ve (2 * i + 1) aynen korunarak kusursuz bir ayna simetrisi elde edilir.',
        'Zaman Karmaşıklığı: O(n²) olup, ek bellek ihtiyacı olmadan O(1) hafıza ile çalışır.'
      ]
    }
  },
  {
    id: 'diamond-alternative',
    title: 'Elmas Deseni (Alternatif İleri Sayımlı Çözüm)',
    badge: 'Alternatif Yöntem',
    filename: 'ElmasAlternatif.java',
    description: 'İkinci döngüde i=1\'den n\'e kadar ileri sayım yaparak formülü 2*(n-i)+1 şeklinde uyarlayan yöntem.',
    code: `import java.util.Scanner;

/**
 * Hazırlayan: Enes Öztürk
 * Alternatif Çözüm: İki döngü de ileri sayımlı
 */
public class Main {
    public static void main(String[] args) {
        Scanner klavye = new Scanner(System.in);
        System.out.print("Bir Sayı Giriniz : ");
        int n = klavye.nextInt();

        // Üst Kısım (0'dan n'e)
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i + 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // Alt Kısım (1'den n'e ileri sayımlı)
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * (n - i) + 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }

        System.out.println("\\nİmza: Enes Öztürk");
        klavye.close();
    }
}`,
    explanation: {
      title: 'İleri Sayımlı Yöntemin Mantığı',
      points: [
        'Alt kısımda i=1 ile başlar, böylece merkez satır tekrar basılmaz.',
        'Boşluk sayısı doğrudan satır numarası (i) kadardır.',
        'Yıldız sayısı ise 2 * (n - i) + 1 formülü ile her adımda 2 eksilerek 1 yıldıza kadar iner.'
      ]
    }
  },
  {
    id: 'triangle-original',
    title: 'Orijinal Üçgen / Piramit (Dersteki Kod)',
    badge: 'Ders Kodu',
    filename: 'UcgenYapimi.java',
    description: 'Kullanıcının paylaştığı, tek yönlü piramit oluşturan temel Java for döngüsü kodu.',
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner klavye = new Scanner(System.in);
        System.out.println("Bir Sayı Giriniz :");
        int n = klavye.nextInt();

        for (int i = 0; i <= n ; i++) {
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i + 1); k++) {
                System.out.print("*");
            }
            System.out.println(" ");
        }

        // Kod Referansı: Enes Öztürk
        klavye.close();
    }
}`,
    explanation: {
      title: 'Üçgen Döngüsü İncelemesi',
      points: [
        'Sadece üst yarıyı inşa eder.',
        'n girildiğinde toplam n + 1 adet satır basılır.',
        'Elmas yapmak için bu döngünün hemen ardına ters yönde çalışan bir ayna döngü eklenir.'
      ]
    }
  },
  {
    id: 'hollow-diamond',
    title: 'İçi Boş Elmas (Bonus İleri Düzey Algoritma)',
    badge: 'Bonus / Extra',
    filename: 'IciBosElmas.java',
    description: 'Sadece dış kenarlara yıldız basarak elmasın içini boş bırakan koşullu (if-else) algoritma.',
    code: `import java.util.Scanner;

/**
 * Hazırlayan: Enes Öztürk
 * Bonus: İçi Boş Elmas Deseni (Hollow Diamond)
 */
public class Main {
    public static void main(String[] args) {
        Scanner klavye = new Scanner(System.in);
        System.out.print("Bir Sayı Giriniz : ");
        int n = klavye.nextInt();

        // Üst Kısım
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i + 1); k++) {
                if (k == 1 || k == (2 * i + 1)) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }

        // Alt Kısım
        for (int i = n - 1; i >= 0; i--) {
            for (int j = 0; j < (n - i); j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i + 1); k++) {
                if (k == 1 || k == (2 * i + 1)) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }

        System.out.println("\\n--- Hazırlayan: Enes Öztürk ---");
        klavye.close();
    }
}`,
    explanation: {
      title: 'İçi Boş Desen Mantığı',
      points: [
        'Yıldız döngüsü içinde "if (k == 1 || k == 2*i + 1)" şartı kontrol edilir.',
        'Yalnızca ilk karakter (k=1) ve son karakter (k = 2*i + 1) için yıldız basılır, aradaki tüm karakterler boşluk olur.'
      ]
    }
  }
];
